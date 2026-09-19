import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import productRoutes from './routes/products.js'
import uploadRoutes from './routes/upload.js'

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
app.use("/uploads", express.static("uploads"));
app.use('/api/products', productRoutes)
app.use('/api/uploads', uploadRoutes)
app.get('/', function(req, res) {
  res.json({ message: 'API DZShop en ligne' })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log('Serveur sur http://localhost:' + PORT);
});
