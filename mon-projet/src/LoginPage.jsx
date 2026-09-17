import { useState, useContext } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { AuthContext } from "./contexte/AuthContext";


function LoginPage() {

  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [erreur, setErreur] = useState("");

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  function envoyer(e) {

    e.preventDefault();

    if (login(email, mdp)) {

      navigate("/"); // Redirection vers la page d'accueil après connexion réussie

    } else {

      setErreur("Email ou mot de passe incorrect");

    }

  }
  return (
    <div className="login-container">

      <h2 className="mb-4">
      Se connecter
      </h2>
      {erreur && (
        <div className="alert alert-danger">
          {erreur}
        </div>
      )}


      <form onSubmit={envoyer}>

        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />


        <input
          className="form-control mb-3"
          type="password"
          placeholder="Mot de passe"
          value={mdp}
          onChange={(e)=>setMdp(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100">
          Se connecter
        </button>

      </form>


      <p className="text-center mt-3">
        Pas de compte ?{" "}
        <NavLink  to="/register"> Créer un compte </NavLink>
      </p>
    </div>
  );
}

export default LoginPage;