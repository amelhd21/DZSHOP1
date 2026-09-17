import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./contexte/CartContext";
function CheckoutPage() {
const { total, livraison, clearCart, panier } = useContext(CartContext);
const [valide, setValide] = useState(false);

  function commander(e){

    e.preventDefault();

    clearCart();

    setValide(true);

  }
  if(valide){

    return (

      <div className="container py-5 text-center"style={{marginTop:"150px", maxHeight:"650px",marginBottom:"150px"}}>

        <div className="display-1">
          ✅
        </div>

        <h1>
          Commande confirmée🎉
        </h1>
      
        <p >
          Merci pour votre commande.
        </p>
        <br/>
        <Link className="btn btn-primary"to="/products"style={{fontSize:"20px"}}>
          Continuer mes achats
        </Link>
        </div>

    );

  }
  if(panier.length === 0){
    return (

      <div className="container py-5 text-center">

        <p>
          Votre panier est vide.
        </p>

        <Link 
          className="btn btn-primary"
          to="/products"
        >
          Voir les produits
        </Link>


      </div>

    );

  }



  return (

    <div 
      className="container py-5"
      style={{maxWidth:"500px"}}
    >


      <h1 className="mb-4">
        Livraison
      </h1>



      <form onSubmit={commander}>


        <input
          className="form-control mb-3"
          placeholder="Nom complet"
          required
        />


        <input
          className="form-control mb-3"
          placeholder="Téléphone"
          required
        />


        <input
          className="form-control mb-3"
          placeholder="Wilaya"
          required
        />


        <input
          className="form-control mb-3"
          placeholder="Commune"
          required
        />


        <textarea
          className="form-control mb-3"
          placeholder="Adresse détaillée"
          required
        />


        <ul className="list-group mb-3">


          <li className="list-group-item d-flex justify-content-between">
            <span>Sous-total</span>
            <span>
              {total} DZD
            </span>
          </li>


          <li className="list-group-item d-flex justify-content-between">
            <span>Livraison</span>
            <span>
              {livraison === 0 ? "Gratuite" : livraison + " DZD"}
            </span>
          </li>
          <li className="list-group-item d-flex justify-content-between fw-bold">
            <span>Total</span>
            <span>
              {total + livraison} DZD
            </span>
          </li>
        </ul>
        <button className="btn btn-success w-100">
          Confirmer la commande
        </button>



      </form>


    </div>
  );
}
export default CheckoutPage;

     