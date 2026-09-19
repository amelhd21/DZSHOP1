// Utilisation (depuis le dossier mon-projet) :  node scripts/optimize-images.mjs
// Convertit toutes les images de public/images en WebP (largeur max 800 px),
// supprime les originaux, et met à jour les chemins dans seedProducts.js.

import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const DOSSIER = 'public/images'
const SEED = '../dzshop-api/seedProducts.js'

function fichiers(dossier) {
  return fs.readdirSync(dossier, { withFileTypes: true }).flatMap(function (e) {
    const chemin = path.join(dossier, e.name)
    return e.isDirectory() ? fichiers(chemin) : [chemin]
  })
}

let avant = 0
let apres = 0
let nombre = 0

for (const fichier of fichiers(DOSSIER)) {

  const ext = path.extname(fichier).toLowerCase()

  if (!['.png', '.jpg', '.jpeg', '.jfif'].includes(ext)) continue

  const sortie = fichier.slice(0, -ext.length) + '.webp'

  avant += fs.statSync(fichier).size

  await sharp(fichier)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(sortie)

  apres += fs.statSync(sortie).size
  fs.unlinkSync(fichier)
  nombre++
}

// "/images/souris/souris.png" devient "/images/souris/souris.webp" dans le seed
let seed = fs.readFileSync(SEED, 'utf8')
seed = seed.replace(/(\/images\/[^"']+)\.(png|jpg|jpeg|jfif)/gi, '$1.webp')
fs.writeFileSync(SEED, seed)

const mo = function (o) { return (o / 1024 / 1024).toFixed(1) }
console.log(nombre + ' images converties : ' + mo(avant) + ' Mo -> ' + mo(apres) + ' Mo')