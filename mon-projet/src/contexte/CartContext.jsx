
import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {
  // Au démarrage, on relit le panier sauvegardé
  const [panier, setPanier] = useState(() => {
    try {
      const sauvegarde = localStorage.getItem('panier')
      return sauvegarde ? JSON.parse(sauvegarde) : []
    } catch {
      return []
    }
  })

  // À chaque changement du panier, on le sauvegarde
  useEffect(() => {
    localStorage.setItem('panier', JSON.stringify(panier))
  }, [panier])

  // Ajouter un produit au panier
  const addToCart = (product) => {
    setPanier((prevPanier) => {
      const produitExiste = prevPanier.find(
        (p) => p.id === product.id
      )

      if (produitExiste) {
        return prevPanier.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      }

      return [
        ...prevPanier,
        {
          ...product,
          quantity: 1
        }
      ]
    })
  }

  // Supprimer complètement un produit
  const removeFromCart = (productId) => {
    setPanier((prevPanier) =>
      prevPanier.filter((p) => p.id !== productId)
    )
  }

  // Modifier la quantité
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setPanier((prevPanier) =>
      prevPanier.map((p) =>
        p.id === productId
          ? { ...p, quantity }
          : p
      )
    )
  }

  // Calcul du total
  const total = panier.reduce(
    (somme, produit) =>
      somme + produit.price * produit.quantity,
    0
  )

  // Livraison gratuite à partir de 10 000
  const livraison = total >= 10000 ? 0 : 500

  // Vider le panier
  const clearCart = () => {
    setPanier([])
  }

  return (
    <CartContext.Provider
      value={{
        panier,
        addToCart,
        removeFromCart,
        updateQuantity,
        total,
        livraison,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
