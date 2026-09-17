import { createContext, useState } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [panier, setPanier] = useState([])

  const addToCart = (product) => {
    setPanier((prevPanier) => {
      const existingProduct = prevPanier.find((p) => p.id === product.id)
      if (existingProduct) {
        return prevPanier.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      } else {
        return [...prevPanier, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setPanier((prevPanier) => prevPanier.filter((p) => p.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setPanier((prevPanier) =>
      prevPanier.map((p) =>
        p.id === productId ? { ...p, quantity } : p
      )
    )
  }

  const total = panier.reduce(
    (somme, produit) =>
      somme + produit.price * produit.quantity,
    0
  )

  const livraison = total >= 10000 ? 0 : 500

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