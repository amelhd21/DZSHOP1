
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhone,
    faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function Piedpage() {
    return (
        <footer className="piedpage">

            <div className="divfooter">

                {/* DZSHOP */}
                <div className="s1divfooter">
                    <h2>🛒 DZShop</h2>

                    <p>
                        Votre boutique d'electronique en ligne.
                        Livraison dans les 58 wilayas.
                    </p>
                </div>

                {/* Navigation */}
                <div className="s2divfooter">
                    <ul>
                        <h2>Navigation</h2>

                        <li>
                            <NavLink className="nav-link"to="/">Accueil </NavLink>
                        </li>

                        <li>
                             <NavLink className="nav-link"to="/products">Produits </NavLink>
                        </li>

                        <li>
                            <a href="#Panier">Panier</a>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="social-media">

                    <h2>Contact</h2>

                    <div className="icone">
                     
                        <div className="icone1">
                            <p>📍 Skikda, Algérie</p>
                        </div>

                        <div className="icone1">
                            <FontAwesomeIcon icon={faPhone} />
                            <p>0555 12 34 56</p>
                        </div>

                        <div className="icone1">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <p>contact@dzshop.dz</p>
                        </div>

                    </div>
                </div>

                {/* Copyright */}
                <div className="s3divfooter">
                    <p>
                        © 2026 DZShop — Tous droits réservés
                    </p>
                </div>

            </div>

        </footer>
    );
}

export default Piedpage;