import mongoose from 'mongoose'

// Une ligne de commande = une "photo" du produit AU MOMENT de l'achat.
// Si le prix change demain, les anciennes commandes gardent l'ancien prix.
const articleSchema = new mongoose.Schema({
  productId: { type: String, required: true },   // ton id personnalisé "p1", "p2"...
  title:     { type: String, required: true },
  price:     { type: Number, required: true, min: 0 },
  quantity:  { type: Number, required: true, min: 1 },
  img:       { type: String, default: '' }
}, { _id: false })

const schema = new mongoose.Schema({

  reference: { type: String, unique: true },       // "CMD0001", "CMD0002"...

  user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  client: { type: String, required: true },        // nom du client au moment de la commande

  articles: {
    type: [articleSchema],
    validate: function (a) { return a.length > 0 }
  },

  sousTotal: { type: Number, required: true },
  livraison: { type: Number, required: true },
  total:     { type: Number, required: true },

  status: {
    type: String,
    enum: ['En attente', 'Livrée', 'Annulée'],
    default: 'En attente'
  },

  telephone: { type: String, required: true, trim: true },
  wilaya:    { type: String, required: true, trim: true },
  commune:   { type: String, default: '', trim: true },
  adresse:   { type: String, required: true, trim: true }

}, {
  timestamps: true
})

// Avant de valider une nouvelle commande, on lui donne son numéro
schema.pre('validate', async function () {
  if (this.reference) return
  const nombre = await mongoose.model('Order').countDocuments()
  this.reference = 'CMD' + String(nombre + 1).padStart(4, '0')
})

export default mongoose.model('Order', schema)