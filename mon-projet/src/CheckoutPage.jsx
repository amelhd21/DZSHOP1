import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./contexte/CartContext";
import { AuthContext } from "./contexte/AuthContext";
import { apiFetch, lireJson } from "./api";

function CheckoutPage() {

  const { total, livraison, clearCart, panier } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  // Le formulaire est pré-rempli avec les infos du compte
  const [nom, setNom] = useState(user.nom || "");
  const [telephone, setTelephone] = useState(user.telephone || "");
  const [wilaya, setWilaya] = useState(user.wilaya || "");
  const [commune, setCommune] = useState("");
  const [adresse, setAdresse] = useState(user.adresse || "");

  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");
  const [commande, setCommande] = useState(null);   // la commande créée par le serveur

  async function commander(e) {

    e.preventDefault();

    setErreur("");
    setEnvoi(true);

    try {

      // On envoie SEULEMENT l'id et la quantité de chaque produit.
      // Le serveur retrouve les prix lui-même : impossible de tricher.
      const creee = await lireJson(
        await apiFetch("/api/orders", {
          method: "POST",
          body: JSON.stringify({
            articles: panier.map(function (produit) {
              return { id: produit.id, quantity: produit.quantity };
            }),
            telephone: telephone,
            wilaya: wilaya,
            commune: commune,
            adresse: adresse
          })
        })
      );

      clearCart();
      setCommande(creee);

    } catch (err) {

      setErreur(err.message);

    } finally {

      setEnvoi(false);

    }

  }

  if (commande) {

    return (

      <div className="container py-5 text-center" style={{ marginTop: "150px", maxHeight: "650px", marginBottom: "150px" }}>

        <div className="display-1">
          ✅
        </div>

        <h1>
          Commande confirmée 🎉
        </h1>

        <p>
          Merci {user.nom} ! Votre commande <strong>{commande.id}</strong> de{" "}
          <strong>{commande.total.toLocaleString("fr-DZ")} DA</strong> est enregistrée.
        </p>

        <p>
          Paiement à la livraison. Vous pouvez suivre son statut dans votre compte.
        </p>

        <br />

        <Link className="btn btn-primary me-2" to="/profile" style={{ fontSize: "20px" }}>
          Mes commandes
        </Link>

        <Link className="btn btn-outline-primary" to="/products" style={{ fontSize: "20px" }}>
          Continuer mes achats
        </Link>

      </div>

    );

  }

  if (panier.length === 0) {

    return (

      <div className="container py-5 text-center">

        <p>
          Votre panier est vide.
        </p>

        <Link className="btn btn-primary" to="/products">
          Voir les produits
        </Link>

      </div>

    );

  }

  return (

    <div className="container py-5" style={{ maxWidth: "500px" }}>

      <h1 className="mb-4">
        Livraison
      </h1>

      {erreur && (
        <div className="alert alert-danger">
          {erreur}
        </div>
      )}

      <form onSubmit={commander}>

        <input
          className="form-control mb-3"
          placeholder="Nom complet"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Téléphone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Wilaya"
          value={wilaya}
          onChange={(e) => setWilaya(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Commune"
          value={commune}
          onChange={(e) => setCommune(e.target.value)}
          required
        />

        <textarea
          className="form-control mb-3"
          placeholder="Adresse détaillée"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          required
        />

        <ul className="list-group mb-3">

          <li className="list-group-item d-flex justify-content-between">
            <span>Sous-total</span>
            <span>{total.toLocaleString("fr-DZ")} DZD</span>
          </li>

          <li className="list-group-item d-flex justify-content-between">
            <span>Livraison</span>
            <span>{livraison === 0 ? "Gratuite" : livraison + " DZD"}</span>
          </li>

          <li className="list-group-item d-flex justify-content-between fw-bold">
            <span>Total</span>
            <span>{(total + livraison).toLocaleString("fr-DZ")} DZD</span>
          </li>

        </ul>

        <button className="btn btn-success w-100" disabled={envoi}>
          {envoi ? "Envoi en cours..." : "Confirmer la commande"}
        </button>

      </form>

    </div>
  );
}

export default CheckoutPage;