import express from 'express'
import Order from '../models/Order.js'
import Product from '../models/Product.js'
import { protect, isAdmin } from '../middleware/auth.js'

const router = express.Router()

// Règle de livraison (la même que dans ton CartContext) : gratuite dès 10 000 DA
const SEUIL_LIVRAISON_GRATUITE = 10000
const FRAIS_LIVRAISON = 500

// Met une commande sous la forme que tes pages React attendent déjà
// (id = "CMD0001", date = "16/09/2026", status, total...)
export function versFront(order) {
  return {
    _id: order._id,
    id: order.reference,
    client: order.client,
    date: new Date(order.createdAt).toLocaleDateString('fr-FR'),
    total: order.total,
    sousTotal: order.sousTotal,
    livraison: order.livraison,
    status: order.status,
    telephone: order.telephone,
    wilaya: order.wilaya,
    commune: order.commune,
    adresse: order.adresse,
    articles: order.articles,
    products: order.articles.map(function (a) {
      return a.title + ' × ' + a.quantity
    }).join(', ')
  }
}

// CRÉER UNE COMMANDE (client connecté)
router.post('/', protect, async function (req, res) {

  try {

    const { articles, telephone, wilaya, commune, adresse } = req.body

    if (!Array.isArray(articles) || articles.length === 0) {
      return res.status(400).json({ message: 'Le panier est vide' })
    }

    if (!telephone || !wilaya || !adresse) {
      return res.status(400).json({ message: 'Téléphone, wilaya et adresse obligatoires' })
    }

    // Le navigateur envoie SEULEMENT { id, quantity }.
    // Les prix, on va les chercher NOUS-MÊMES dans la base.
    const ids = articles.map(function (a) { return String(a.id) })
    const produits = await Product.find({ id: { $in: ids } })

    let sousTotal = 0
    const lignes = []

    for (const a of articles) {

      const produit = produits.find(function (p) { return p.id === String(a.id) })
      const quantity = Number(a.quantity)

      if (!produit) {
        return res.status(400).json({ message: 'Produit introuvable : ' + a.id })
      }

      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        return res.status(400).json({ message: 'Quantité invalide pour ' + produit.title })
      }

      sousTotal += produit.price * quantity

      lignes.push({
        productId: produit.id,
        title: produit.title,
        price: produit.price,
        quantity: quantity,
        img: produit.img
      })
    }

    const livraison = sousTotal >= SEUIL_LIVRAISON_GRATUITE ? 0 : FRAIS_LIVRAISON

    const order = await Order.create({
      user: req.user._id,
      client: req.user.nom,
      articles: lignes,
      sousTotal: sousTotal,
      livraison: livraison,
      total: sousTotal + livraison,
      telephone: telephone,
      wilaya: wilaya,
      commune: commune,
      adresse: adresse
    })

    res.status(201).json(versFront(order))

  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// MES COMMANDES (client connecté)
router.get('/my', protect, async function (req, res) {

  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(orders.map(versFront))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// TOUTES LES COMMANDES (admin)
router.get('/', protect, isAdmin, async function (req, res) {

  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders.map(versFront))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// CHANGER LE STATUT (admin)
router.patch('/:id/status', protect, isAdmin, async function (req, res) {

  try {

    const { status } = req.body

    if (!['En attente', 'Livrée', 'Annulée'].includes(status)) {
      return res.status(400).json({ message: 'Statut invalide' })
    }

    const order = await Order.findByIdAndUpdate(req.params.id, { status: status }, { returnDocument: 'after' })

    if (!order) {
      return res.status(404).json({ message: 'Commande introuvable' })
    }

    res.json(versFront(order))

  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

export default router