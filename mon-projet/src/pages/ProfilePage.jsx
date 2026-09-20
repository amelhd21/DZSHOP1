
import { AuthContext } from "../contexte/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShoppingCart
} from "react-icons/fa";
import "./ProfilePage.css";
import { useContext, useState, useEffect } from "react";
import { apiFetch, lireJson } from "../api";

function ProfilePage() {

  const { user } = useContext(AuthContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const [orders, setOrders] = useState([]);
  const [chargement, setChargement] = useState(true);

  // On charge MES commandes depuis le serveur
  useEffect(() => {
    apiFetch("/api/orders/my")
      .then(lireJson)
      .then((data) => setOrders(data))
      .catch(() => {})
      .finally(() => setChargement(false));
  }, []);

  async function handlePasswordChange(e) {

    e.preventDefault();

    setMessage("");
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (newPassword.length < 6) {
      setError(
        "Le nouveau mot de passe doit contenir au moins 6 caractères."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(
        "Les deux nouveaux mots de passe ne correspondent pas."
      );
      return;
    }

    try {

      await lireJson(
        await apiFetch("/api/auth/password", {
          method: "PUT",
          body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword
          })
        })
      );

      setMessage("Votre mot de passe a bien été modifié.");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err) {

      setError(err.message);

    }
  }

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">

      <div className="profile-container">

        <div className="profile-header">
          <h1>Mon compte</h1>
          <p>
            Gérez vos informations personnelles et la sécurité
            de votre compte.
          </p>
        </div>

        <div className="profile-grid">

          {/* INFORMATIONS */}

          <section className="profile-card">

            <div className="profile-card-title">
              <FaUser />

              <div>
                <h2>Mes informations</h2>
                <p>Informations de votre compte</p>
              </div>
            </div>

            <div className="profile-avatar">
              {user.nom
                ? user.nom.charAt(0).toUpperCase()
                : "U"}
            </div>

            <div className="profile-info">

              <div className="profile-info-item">

                <FaUser />

                <div>
                  <span>Nom</span>
                  <strong>
                    {user.nom || "Utilisateur"}
                  </strong>
                </div>

              </div>

              <div className="profile-info-item">

                <FaEnvelope />

                <div>
                  <span>Email</span>
                  <strong>
                    {user.email}
                  </strong>
                </div>

              </div>

            </div>

          </section>
          

          {/* MOT DE PASSE */}

          <section className="profile-card">

            <div className="profile-card-title">

              <FaLock />

              <div>
                <h2>Sécurité</h2>
                <p>Modifier votre mot de passe</p>
              </div>

            </div>

            <form
              className="password-form"
              onSubmit={handlePasswordChange}
            >

              <div className="password-field">

                <label>
                  Mot de passe actuel
                </label>

                <div className="password-input">

                  <input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) =>
                      setCurrentPassword(e.target.value)
                    }
                    placeholder="Votre mot de passe actuel"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrent(!showCurrent)
                    }
                  >
                    {showCurrent
                      ? <FaEyeSlash />
                      : <FaEye />}
                  </button>

                </div>

              </div>

             


              <div className="password-field">

                <label>
                  Nouveau mot de passe
                </label>

                <div className="password-input">

                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                    placeholder="Nouveau mot de passe"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNew(!showNew)
                    }
                  >
                    {showNew
                      ? <FaEyeSlash />
                      : <FaEye />}
                  </button>

                </div>

              </div>

              <div className="password-field">

                <label>
                  Confirmer le nouveau mot de passe
                </label>

                <div className="password-input">

                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirmez le nouveau mot de passe"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirm(!showConfirm)
                    }
                  >
                    {showConfirm
                      ? <FaEyeSlash />
                      : <FaEye />}
                  </button>

                </div>

              </div>

              {error && (
                <div className="profile-error">
                  {error}
                </div>
              )}

              {message && (
                <div className="profile-success">
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="password-submit"
              >
                Modifier le mot de passe
              </button>

            </form>

          </section>

        </div>

      </div>
 <section className="profile-card orders-card">

  <div className="profile-card-title">

    <FaShoppingCart />

    <div>
      <h2>Mes commandes</h2>
      <p>Historique de vos achats</p>
    </div>

  </div>


  <div className="orders-list">
{chargement && <p>Chargement...</p>}

{!chargement && orders.length === 0 && (
  <p>Vous n'avez pas encore passé de commande.</p>
)}
    {orders.map(order => (

      <div
        className="order-item"
        key={order.id}
      >

        <div className="order-header">

          <strong>
            {order.id}
          </strong>

          <span>
            {order.date}
          </span>

        </div>


        <p>
          {order.products}
        </p>


        <div className="order-footer">

          <strong>
            {order.total.toLocaleString()} DA
          </strong>


          <span
            className={
              order.status === "Livrée"
                ? "order-delivered"
                : "order-pending"
            }
          >
            {order.status}
          </span>

        </div>


      </div>

    ))}

  </div>

</section>
    </div>
    
  );
}

export default ProfilePage;
