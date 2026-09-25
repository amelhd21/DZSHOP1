// Utilisation (depuis dzshop-api) :  node migrerImages.js
// Met à jour les produits DÉJÀ présents dans MongoDB : ".png" / ".jpg" / ".jpeg" /
// ".jfif" devient ".webp" pour les images du dossier /images/.
// Les produits ajoutés depuis l'admin (photos Cloudinary ou uploads) ne sont pas
// touchés, et rien n'est supprimé.

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './models/Product.js'

dotenv.config()

function versWebp(chemin) {
  if (typeof chemin !== 'string' || !chemin.startsWith('/images/')) return chemin
  return chemin.replace(/\.(png|jpe?g|jfif)$/i, '.webp')
}

try {
  await mongoose.connect(process.env.MONGODB_URI)

  const produits = await Product.find()
  let modifies = 0

  for (const p of produits) {

    const nouvelleImg = versWebp(p.img)
    const nouvellesImages = (p.images || []).map(versWebp)

    const change = nouvelleImg !== p.img || nouvellesImages.join('|') !== (p.images || []).join('|')

    if (change) {
      p.img = nouvelleImg
      p.images = nouvellesImages
      await p.save()
      modifies++
    }
  }

  console.log(modifies + ' produit(s) mis à jour sur ' + produits.length)
} catch (err) {
  console.log('Erreur : ' + err.message)
} finally {
  await mongoose.disconnect()
}