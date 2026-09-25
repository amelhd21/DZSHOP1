import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const schema = new mongoose.Schema({

  nom: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,      // deux comptes ne peuvent pas avoir le même email
    lowercase: true,   // "Amel@Gmail.com" devient "amel@gmail.com"
    trim: true
  },

 password: {
  type: String,
  required: function () {
    return this.provider === 'local'
  },
  minlength: 6
},

provider: {
  type: String,
  enum: ['local', 'google'],
  default: 'local'
},

googleId: {
  type: String,
  default: null
},

  telephone: { type: String, trim: true, default: '' },
  wilaya:    { type: String, trim: true, default: '' },
  adresse:   { type: String, trim: true, default: '' },

  // "client" par défaut. On ne devient admin que dans la base (voir makeAdmin.js)
  role: {
    type: String,
    enum: ['client', 'admin'],
    default: 'client'
  },

  // Un admin peut bloquer un compte
  status: {
    type: String,
    enum: ['actif', 'bloque'],
    default: 'actif'
  }

}, {
  timestamps: true
})

// AVANT chaque sauvegarde : on remplace le mot de passe par son "hash".
// Fonction async SANS "next" (Mongoose moderne).
schema.pre('save', async function () {
  if (!this.password || !this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
})

// Compare le mot de passe tapé avec la version hachée en base
schema.methods.verifierMotDePasse = function (motDePasse) {
  // Compte Google : pas de mot de passe en base, donc jamais valide
  if (!this.password) return false
  return bcrypt.compare(motDePasse, this.password)
}

// Ce qu'on a le droit de renvoyer au navigateur (JAMAIS le password)
schema.methods.versPublic = function () {
  return {
    id: this._id,
    nom: this.nom,
    email: this.email,
    telephone: this.telephone,
    wilaya: this.wilaya,
    adresse: this.adresse,
    role: this.role,
    status: this.status
  }
}

export default mongoose.model('User', schema)