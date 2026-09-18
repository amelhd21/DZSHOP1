import mongoose from 'mongoose'

const schema = new mongoose.Schema({

  id: {
    type: String,
    required: true,
    unique: true
  },

  title: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true,
    min: 0
  },

  img: {
    type: String,
    required: true
  },

  images: {
    type: [String],
    default: []
  },

  dec: {
    type: String,
    required: true
  }

}, {
  timestamps: true
})

export default mongoose.model('Product', schema)