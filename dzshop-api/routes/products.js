import express from 'express'
import Product from '../models/Product.js'
import { protect, isAdmin } from '../middleware/auth.js'


const router = express.Router()

// Sans pagination : garder le tableau attendu par l'administration.
// Avec page ou limit : charger uniquement les produits de la page demandée.
router.get('/', async function(req, res) {

  try {

    const paginationDemandee = req.query.page !== undefined || req.query.limit !== undefined

    if (!paginationDemandee) {
      const produits = await Product.find()
      return res.json(produits)
    }

    function entierPositif(valeur, defaut) {
      if (valeur === undefined) return defaut
      if (typeof valeur !== 'string' || !/^\d+$/.test(valeur)) return null

      const nombre = Number(valeur)
      return Number.isSafeInteger(nombre) && nombre > 0 ? nombre : null
    }

    const pageDemandee = entierPositif(req.query.page, 1)
    const limit = entierPositif(req.query.limit, 8)

    if (pageDemandee === null || limit === null || limit > 64) {
      return res.status(400).json({
        message: 'page et limit doivent être des entiers positifs. limit ne peut pas dépasser 64.'
      })
    }

    if (req.query.search !== undefined && typeof req.query.search !== 'string') {
      return res.status(400).json({ message: 'La recherche doit être un texte.' })
    }

    const search = (req.query.search || '').trim()
    const sort = req.query.sort === undefined ? '' : req.query.sort

    if (!['', 'asc', 'desc'].includes(sort)) {
      return res.status(400).json({ message: 'Le tri doit être asc ou desc.' })
    }

    const filtre = {}

    if (search) {
      // Échapper les caractères spéciaux pour rechercher le texte saisi littéralement.
      const texte = search.replace(/[$.*+?^{}()|[\]\\]/g, '\\$&')
      const recherche = new RegExp(texte, 'i')
      filtre.$or = [{ title: recherche }, { dec: recherche }]
    }

    const tri = sort === ''
      ? { _id: 1 }
      : { price: sort === 'asc' ? 1 : -1, _id: 1 }

    const total = await Product.countDocuments(filtre)
    const totalPages = Math.ceil(total / limit)
    const page = total > 0 ? Math.min(pageDemandee, totalPages) : 1

    const products = await Product.find(filtre)
      .sort(tri)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    res.json({ products, page, limit, total, totalPages })

  } catch (err) {

    res.status(500).json({
      message: err.message
    })

  }

})


// LIRE un seul produit avec ton id personnalisé "p1", "p2", etc.
router.get('/:id', async function(req, res) {

  try {

    const produit = await Product.findOne({
      id: req.params.id
    })

    if (!produit) {

      return res.status(404).json({
        message: 'Produit introuvable'
      })

    }

    res.json(produit)

  } catch (err) {

    res.status(500).json({
      message: err.message
    })

  }

})

// CRÉER un produit
router.post('/',      protect, isAdmin, async function(req, res) {

  try {

    const nouveau = await Product.create(req.body)

    res.status(201).json(nouveau)

  } catch (err) {

    res.status(400).json({
      message: err.message
    })

  }

})


// MODIFIER un produit
router.put('/:id',      protect, isAdmin, async function(req, res) {

  try {

    const produit = await Product.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      {
       returnDocument: 'after',
        runValidators: true
      }
    )

    if (!produit) {

      return res.status(404).json({
        message: 'Produit introuvable'
      })

    }

    res.json(produit)

  } catch (err) {

    res.status(400).json({
      message: err.message
    })

  }

})


// SUPPRIMER un produit
router.delete('/:id', protect, isAdmin, async function(req, res) {

  try {

    const produit = await Product.findOneAndDelete({
      id: req.params.id
    })

    if (!produit) {

      return res.status(404).json({
        message: 'Produit introuvable'
      })

    }

    res.json({
      message: 'Produit supprimé'
    })

  } catch (err) {

    res.status(500).json({
      message: err.message
    })

  }

})

export default router
