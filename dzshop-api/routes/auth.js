import googleAuthLibrary from 'google-auth-library'
import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()
const { OAuth2Client } = googleAuthLibrary
const googleClient =new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// Fabrique le "bracelet" (token) : il contient l'id de l'utilisateur, valable 7 jours
function creerToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// INSCRIPTION
router.post('/register', async function (req, res) {

  try {

    // On choisit les champs UN PAR UN. Jamais User.create(req.body) :
    // sinon un visiteur pourrait envoyer "role": "admin".
    const { nom, email, password, telephone, wilaya, adresse } = req.body

    if (!nom || !email || !password) {
      return res.status(400).json({ message: 'Nom, email et mot de passe obligatoires' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Le mot de passe doit faire au moins 6 caractères' })
    }

    const existe = await User.findOne({ email: email.toLowerCase().trim() })

    if (existe) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' })
    }

    const user = await User.create({ nom, email, password, telephone, wilaya, adresse })

    res.status(201).json({ token: creerToken(user), user: user.versPublic() })

  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
// CONNEXION / INSCRIPTION AVEC GOOGLE
router.post('/google', async function (req, res) {

  try {

    const { credential } = req.body

    if (!credential) {
      return res.status(400).json({ message: 'Jeton Google manquant' })
    }

    // Google vérifie que le jeton est authentique
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()

    if (!payload || !payload.email || !payload.email_verified) {
      return res.status(401).json({ message: 'Compte Google non valide' })
    }

    const email = payload.email.toLowerCase().trim()

    // Cherche si cet email existe déjà dans DZSHOP
    let user = await User.findOne({ email: email })

    if (!user) {

      // Première connexion Google :
      // création automatique du compte DZSHOP
      user = await User.create({
        nom: payload.name || email.split('@')[0],
        email: email,
        provider: 'google',
        googleId: payload.sub,
        role: 'client'
      })

    } else {

      // Le compte existe déjà.
      // On associe Google au même compte au lieu d'en créer un deuxième.
      if (!user.googleId) {
        user.googleId = payload.sub
        await user.save()
      }
    }

    if (user.status === 'bloque') {
      return res.status(403).json({ message: 'Ce compte est bloqué' })
    }

    res.json({
      token: creerToken(user),
      user: user.versPublic()
    })

  } catch (err) {
    console.error('Erreur Google Auth :', err.message)
    res.status(401).json({ message: 'Authentification Google impossible' })
  }
})

// CONNEXION
router.post('/login', async function (req, res) {

  try {

    const { email, password } = req.body

    const user = await User.findOne({ email: String(email || '').toLowerCase().trim() })

// Compte créé avec Google : pas de mot de passe, on l'explique
if (user && !user.password) {
  return res.status(400).json({
    message: 'Ce compte utilise la connexion Google. Clique sur « Continuer avec Google ».'
  })
}

if (!user || !(await user.verifierMotDePasse(String(password || '')))) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' })
    }

    if (user.status === 'bloque') {
      return res.status(403).json({ message: 'Ce compte est bloqué' })
    }

    res.json({ token: creerToken(user), user: user.versPublic() })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// QUI SUIS-JE ? (le front s'en sert pour vérifier que le token est encore valable)
router.get('/me', protect, function (req, res) {
  res.json({ user: req.user.versPublic() })
})

// CHANGER SON MOT DE PASSE
router.put('/password', protect, async function (req, res) {

  try {

    const { currentPassword, newPassword } = req.body

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'Le nouveau mot de passe doit faire au moins 6 caractères' })
    }

    // req.user vient de protect SANS le password : on le relit avec
    const user = await User.findById(req.user._id)

if (!user.password) {
  return res.status(400).json({
    message: 'Ton compte utilise Google : pas de mot de passe à modifier ici.'
  })
}

if (!(await user.verifierMotDePasse(String(currentPassword || '')))) {
      return res.status(400).json({ message: 'Mot de passe actuel incorrect' })
    }

    user.password = newPassword   // le pre('save') le hache tout seul
    await user.save()

    res.json({ message: 'Mot de passe modifié' })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
router.get('/test', function(req, res) {

  res.json({
    message: "auth chargé"
  })

})
export default router