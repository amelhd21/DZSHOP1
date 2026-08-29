import { Link, useParams } from 'react-router-dom'
import { products } from './produit.jsx'

function ProductDetailPage() {
  const { id } = useParams()

  const produit1 = produit.find(function(p) {
    return p.id === Number(id)
  })

  if (!produit1) {
    return (
      <div className="container py-5 text-center">
        <p>Produit introuvable.</p>
        <Link className="btn btn-primary" to="/products">Retour aux produits</Link>
      </div>
    )
  }

  
}
export default ProductDetailPage;
