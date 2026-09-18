import express from 'express'
import Product from '../models/Product.js'

const router = express.Router()

// LIRE tous les produits
router.get('/', async function(req, res) {

  try {

    const produits = await Product.find()

    res.json(produits)

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
router.post('/', async function(req, res) {

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
router.put('/:id', async function(req, res) {

  try {

    const produit = await Product.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      {
        new: true,
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
router.delete('/:id', async function(req, res) {

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
