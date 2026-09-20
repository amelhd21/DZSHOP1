import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

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

// CONNEXION
router.post('/login', async function (req, res) {

  try {

    const { email, password } = req.body

    const user = await User.findOne({ email: String(email || '').toLowerCase().trim() })

    // Même message si l'email n'existe pas OU si le mot de passe est faux :
    // on n'aide pas un pirate à deviner quels emails existent.
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

export default router