import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// protect = "qui es-tu ?"  (401 si on ne sait pas, 403 si le compte est bloqué)
export async function protect(req, res, next) {

  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: 'Connexion requise' })
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // On relit l'utilisateur en base à chaque requête :
    // si l'admin le bloque ou change son rôle, ça marche tout de suite.
    const user = await User.findById(decoded.id).select('-password')

    if (!user) {
      return res.status(401).json({ message: 'Compte introuvable' })
    }

    if (user.status === 'bloque') {
      return res.status(403).json({ message: 'Ce compte est bloqué' })
    }

    req.user = user
    next()

  } catch (err) {
    res.status(401).json({ message: 'Token invalide ou expiré' })
  }
}

// isAdmin = "as-tu le droit ?"  (403 si non). À placer APRÈS protect.
export function isAdmin(req, res, next) {

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Accès réservé à l'admin" })
  }

  next()
}