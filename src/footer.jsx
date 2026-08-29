/*import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone,faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Piedpage() {
    return (
       <footer className="piedpage">
<div className="divfooter">
<div className="s1divfooter">
    <h3>🛒 DZSHOP</h3>
    <p>Votre boutique d'electroniqu en ligne.Livraison dans les 58 wilayas</p>
</div>
<div className="s2divfooter">
<ul>
    <h3>Navigation</h3>
    <li>
    <a href="#Accueil">Accueil</a>
    </li>
    <li>
    <a href="#Produits">Produits</a>
    </li>
    <li>
    <a href="#Panier">Panier</a>
    </li>
</ul>
</div>
<div className="social-media">
    
    <h3>Contact</h3>
    <div className="icone">
    <div className="icone1">
    <p>Skikda,Algerie</p>
    </div>
    <div className="icone1">
    <FontAwesomeIcon icon={faPhone} /><p>0555 12 34 56</p>
    </div>
    
    <div className="icone1">
    <FontAwesomeIcon icon={faEnvelope} />
    <p>contact@dzshop.dz</p>
    </div>
   </div> 
</div>
<div className="s3divfooter">
    <p><strong> © 2026 MON SITE. TOUS LES DROITS SONT RESERVES.</strong></p>
</div>
</div>
</footer>
  );
}
export default Piedpage;*/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhone,
    faEnvelope
} from "@fortawesome/free-solid-svg-icons";

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
                            <a href="#Accueil">Accueil</a>
                        </li>

                        <li>
                            <a href="#Produits">Produits</a>
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