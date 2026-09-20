

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./contexte/AuthContext";
import "./RegisterPage.css";


function RegisterPage() {

  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");

  const [confirmation, setConfirmation] = useState("");
  const [erreur, setErreur] = useState("");

  const { register } = useContext(AuthContext);

  const navigate = useNavigate();

async function envoyer(e) {

  e.preventDefault();

  if (mdp.length < 6) {
    setErreur("Le mot de passe doit faire au moins 6 caractères");
    return;
  }

  if (mdp !== confirmation) {
    setErreur("Les deux mots de passe ne sont pas identiques");
    return;
  }
  if (!wilaya || wilaya.startsWith("Sélectionnez")) {
    setErreur("Veuillez choisir votre wilaya");
    return;
  }

  setErreur("");

  try {

    await register({
      nom: nom,
      email: email,
      password: mdp,
      telephone: telephone,
      wilaya: wilaya,
      adresse: adresse
    });

    navigate("/");

  } catch (err) {

    setErreur(err.message);

  }
}


  return (

    <div className="checkout-form">

      <h2>
        Créer un compte
      </h2>


   {erreur && (
  <div className="alert alert-danger w-100">
    {erreur}
  </div>
)}


      <form onSubmit={envoyer}>


        <label>
          Nom et prénom
        </label>

        <input
          type="text"
          placeholder="Votre nom et prénom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />


        <label>
          Adresse
        </label>

        <input
          type="text"
          placeholder="Votre adresse"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          required
        />


        <label>
          Wilaya
        </label>

        <select
          value={wilaya}
          onChange={(e) => setWilaya(e.target.value)}
          required
        >
<option>Sélectionnez votre wilaya</option>
<option>01 Adrar</option>
<option>02 Chlef</option>
<option>03 Laghouat</option>
<option>04 Oum El Bouaghi</option>
<option>05 Batna</option>
<option>06 Béjaïa</option>
<option>07 Biskra</option>
<option>08 Béchar</option>
<option>09 Blida</option>
<option>10 Bouira</option>
<option>11 Tamanrasset</option>
<option>12 Tébessa</option>
<option>13 Tlemcen</option>
<option>14 Tiaret</option>
<option>15 Tizi Ouzou</option>
<option>16 Alger</option>
<option>17 Djelfa</option>
<option>18 Jijel</option>
<option>19 Sétif</option>
<option>20 Saïda</option>
<option>21 Skikda</option>
<option>22 Sidi Bel Abbès</option>
<option>23 Annaba</option>
<option>24 Guelma</option>
<option>25 Constantine</option>
<option>26 Médéa</option>
<option>27 Mostaganem</option>
<option>28 M'Sila</option>
<option>29 Mascara</option>
<option>30 Ouargla</option>
<option>31 Oran</option>
<option>32 El Bayadh</option>
<option>33 Illizi</option>
<option>34 Bordj Bou Arréridj</option>
<option>35 Boumerdès</option>
<option>36 El Tarf</option>
<option>37 Tindouf</option>
<option>38 Tissemsilt</option>
<option>39 El Oued</option>
<option>40 Khenchela</option>
<option>41 Souk Ahras</option>
<option>42 Tipaza</option>
<option>43 Mila</option>
<option>44 Aïn Defla</option>
<option>45 Naâma</option>
<option>46 Aïn Témouchent</option>
<option>47 Ghardaïa</option>
<option>48 Relizane</option>
<option>49 Timimoun</option>
<option>50 Bordj Badji Mokhtar</option>
<option>51 Ouled Djellal</option>
<option>52 Béni Abbès</option>
<option>53 In Salah</option>
<option>54 In Guezzam</option>
<option>55 Touggourt</option>
<option>56 Djanet</option>
<option>57 El M'Ghair</option>
<option>58 El Meniaa</option>
        </select>
        <label>
          Téléphone
        </label>

        <input
          type="tel"
          placeholder="Votre numéro de téléphone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          required
        />


        <label>
          Email
        </label>

        <input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />


        <label>
          Mot de passe
        </label>

        <input
          type="password"
          placeholder="Votre mot de passe"
          value={mdp}
          onChange={(e) => setMdp(e.target.value)}
          required
        />


        <label>
          Confirmer le mot de passe
        </label>

        <input
          type="password"
          placeholder="Confirmez votre mot de passe"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          required
        />


        <button
          type="submit"
          className="products-btn"
        >
          Confirmer
        </button>


      </form>

    </div>

  );
}


export default RegisterPage;