
import { Link, useParams } from 'react-router-dom'
import { useState,useContext } from 'react'
import { CartContext } from './contexte/CartContext'
import { products } from './produit.jsx'
import './DetailProductPage.css'

function ProductDetailPage() {
  const { id } = useParams()
  const { addToCart } = useContext(CartContext)
  const [ajoute, setAjoute] = useState(false) 

 function ajouterAuPanier() {
  addToCart(produit1)   // ① on ajoute le produit
  setAjoute(true)      // ② on affiche la confirmation
}
  const produit1 = products.find(function (p) {
    return String(p.id) === String(id)
  })

  const [quantite, setQuantite] = useState(1)

  const [imageActive, setImageActive] = useState(
    produit1?.img || ''
  )

  if (!produit1) {
    return (
      <div className="product-not-found">
        <p>Produit introuvable.</p>

        <Link className="products-btn" to="/products">
          Retour aux produits
        </Link>
      </div>
    )
  }

  // Si ton produit possède plusieurs images dans "images",
  // elles seront utilisées.
  // Sinon, on utilise simplement l'image principale.
  const images = produit1.images
    ? produit1.images
    : [produit1.img]

  // Permet d'afficher une description sous forme de liste.
  // Fonctionne si "dec" est un tableau ou une chaîne de caractères.
  const description = Array.isArray(produit1.dec)
    ? produit1.dec
    : produit1.dec
      ? produit1.dec
          .split('\n')
          .map((item) => item.trim())
          .filter((item) => item !== '')
      : []

  
function handleMouseMove(e) {
  const container = e.currentTarget
  const image = container.querySelector('.main-product-image')

  const rect = container.getBoundingClientRect()

  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100

  image.style.transformOrigin = `${x}% ${y}%`
}

  return (
    <div className="product-detail-container">

      {/* PARTIE GAUCHE */}
      <div className="product-gallery">

        {/* Miniatures */}
        <div className="product-thumbnails">
          {images.map((image, index) => (
            <button
              key={index}
              className={`thumbnail ${
                imageActive === image ? 'active' : ''
              }`}
              onClick={() => setImageActive(image)}
            >
              <img
                src={image}
                alt={`${produit1.title} ${index + 1}`}
              />
            </button>
          ))}
        </div>

        {/* Grande image */}
  <div
  className="main-image-container"
  onMouseMove={handleMouseMove}
>
  <img
    src={imageActive}
    alt={produit1.title}
    className="main-product-image"
  />
</div>
      </div>


      {/* PARTIE DROITE */}
      <div className="product-information">

        <h1 className="product-title">
          {produit1.title}
        </h1>

        {/* Description */}
        <ul className="product-description">
          {description.map((text, index) => (
            <li key={index}>
              {text}
            </li>
          ))}
        </ul>

        {/* Prix */}
        <div className="product-price">
          {produit1.price.toLocaleString('fr-DZ')}DA
        </div>
        <div className="purchase-row">
          
        <button className="cart-btn" onClick={() => {ajouterAuPanier()}}>
          Ajouter au panier
        </button>

        </div>


        {/* Retour */}
        <Link className="products-btn" to="/products">
          Retour
        </Link>

      </div>
    </div>
  )
}

export default ProductDetailPage
