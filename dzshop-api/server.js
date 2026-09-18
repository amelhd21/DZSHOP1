import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import productRoutes from './routes/products.js'

dotenv.config()

mongoose.connect(process.env.MONGODB_URI)
  .then(function() {
    console.log('MongoDB connecté')
  })
  .catch(function(err) {
    console.log('Erreur : ' + err.message)
  })

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/products', productRoutes)

app.get('/', function(req, res) {
  res.json({ message: 'API DZShop en ligne' })
})

app.listen(5000, function() {
  console.log('Serveur sur http://localhost:5000')
})

