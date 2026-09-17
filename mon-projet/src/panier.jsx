import { useContext } from "react";
import { Link } from 'react-router-dom'
import { CartContext } from "./contexte/CartContext.jsx";
import "./panier.css"

function Panier() {
  const { panier, removeFromCart, updateQuantity } =
    useContext(CartContext);

  const totalItems = panier.reduce(
    (total, produit) => total + produit.quantity,
    0
  );

  const totalPrix = panier.reduce(
    (total, produit) =>
      total + produit.price * produit.quantity,
    0
  );

  return (
    <div className="panier">
      <h1>Mon panier</h1>

      {panier.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <p>Nombre d'articles : {totalItems}</p>

          {panier.map((produit) => (
            <div key={produit.id} className="panier-produit">
              <img
                src={produit.img}
                alt={produit.title}
                width="120"
              />

              <h2>{produit.title}</h2>

              <p>
                Prix :{" "}
                {produit.price.toLocaleString("fr-DZ")} DA
              </p>

              <div>
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(
                      produit.id,
                      produit.quantity - 1
                    )
                  }
                >
                  -
                </button>

                <span> {produit.quantity} </span>

                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(
                      produit.id,
                      produit.quantity + 1
                    )
                  }
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => removeFromCart(produit.id)}
              >
                Supprimer
              </button>
            </div>
          ))}

          <h2>
            Total : {totalPrix.toLocaleString("fr-DZ")} DA
          </h2>
        </>
      )}
    <Link className="products-btn" to="/checkout">  Passer Commande </Link>

    </div>
  );
}

export default Panier;