import React, { useState } from "react";
import "./product.css";
import sourisGaming from "./assets/sourisGaming.jfif";
import casqueBluetooth from "./assets/casqueBluetooth.jfif";
import clavierGaming from "./assets/clavierGaming.jfif";
import ecranAsus from "./assets/ecranAsus.jfif";
import webcam from "./assets/webcam.jfif";
import manette from "./assets/manette.jfif";
import imprimante from "./assets/imprimante.jfif";
import routeur from "./assets/routeur.jfif";
import enceinte from "./assets/enceinte.jfif";
import tapisSouris from "./assets/tapisSouris.jfif";
import microphone from "./assets/microphone.jfif";
import supportPc from "./assets/supportPc.jfif";
import hub from "./assets/hub.png";
import clavierSansFil from "./assets/clavierSansFil.jfif";
import sourisSansFil from "./assets/sourisSansFil.jfif";
import galaxyA16 from "./assets/galaxyA16.jfif";
import coqueSmartphone from "./assets/coqueSmartphone.jfif";
import chargeurUsbC from "./assets/chargeurUsbC.jfif";
import powerbank from "./assets/powerbank.jfif";
import cameraWifi from "./assets/cameraWifi.jfif";
import ampouleWifi from "./assets/ampouleWifi.jfif";
import priseWifi from "./assets/priseWifi.png";
import sonnetteVideo from "./assets/sonnetteVideo.jfif";
import capteurMouvement from "./assets/capteurMouvement.jfif";
import { useNavigate } from 'react-router-dom';

// ===============================
// LISTE DES PRODUITS
// ===============================

export const products = [
  {
    id: "p1",
    title: "SOURIS GAMING LOGITECH G102",
    price: 5500,
    img: sourisGaming,
    dec: "Souris gaming précise et réactive, idéale pour les jeux vidéo. Son design ergonomique offre une bonne prise en main pour des sessions confortables.",
  },

  {
    id: "p2",
    title: "CASQUE BLUETOOTH JBL",
    price: 8500,
    img: casqueBluetooth,
    dec: "Casque Bluetooth JBL offrant un son clair et immersif. Profitez de votre musique, de vos vidéos et de vos appels sans fil avec un confort optimal.",
  },

  {
    id: "p3",
    title: "CLAVIER GAMING RGB",
    price: 6500,
    img: clavierGaming,
    dec: "Clavier gaming avec rétroéclairage RGB et touches réactives. Parfait pour jouer avec précision tout en apportant une touche gaming à votre setup.",
  },

  {
    id: "p4",
    title: "ÉCRAN ASUS 24 POUCES",
    price: 30500,
    img: ecranAsus,
    dec: "Écran ASUS 24 pouces offrant une image nette et confortable. Idéal pour le gaming, le travail, les études et le divertissement au quotidien.",
  },

  {
    id: "p5",
    title: "WEBCAM FULL HD 1080P",
    price: 7500,
    img: webcam,
    dec: "Webcam Full HD 1080p idéale pour les visioconférences, les cours en ligne et le streaming. Profitez d'une image claire et détaillée.",
  },

  {
    id: "p6",
    title: "MANETTE GAMING SANS FIL",
    price: 6500,
    img: manette,
    dec: "Manette gaming sans fil offrant une expérience de jeu confortable et une grande liberté de mouvement.",
  },

  {
    id: "p7",
    title: "IMPRIMANTE HP DESKJET",
    price: 18500,
    img: imprimante,
    dec: "Imprimante HP DeskJet pratique pour vos documents et impressions du quotidien.",
  },

  {
    id: "p8",
    title: "ROUTEUR WIFI 6",
    price: 8900,
    img: routeur,
    dec: "Routeur Wi-Fi 6 conçu pour offrir une connexion rapide, stable et performante.",
  },

  {
    id: "p9",
    title: "ENCEINTE BLUETOOTH JBL",
    price: 12500,
    img: enceinte,
    dec: "Enceinte Bluetooth JBL délivrant un son puissant et agréable.",
  },

  {
    id: "p10",
    title: "TAPIS DE SOURIS GAMING XXL",
    price: 3500,
    img: tapisSouris,
    dec: "Grand tapis de souris gaming XXL offrant une surface confortable et fluide.",
  },

  {
    id: "p11",
    title: "MICROPHONE USB GAMING",
    price: 9500,
    img: microphone,
    dec: "Microphone USB gaming conçu pour offrir une voix claire.",
  },

  {
    id: "p12",
    title: "SUPPORT PC PORTABLE",
    price: 4500,
    img: supportPc,
    dec: "Support pour ordinateur portable permettant de surélever votre écran.",
  },

  {
    id: "p13",
    title: "HUB USB MULTIPORT",
    price: 4200,
    img: hub,
    dec: "Hub USB multiport permettant de connecter facilement plusieurs périphériques.",
  },

  {
    id: "p14",
    title: "CLAVIER SANS FIL",
    price: 5500,
    img: clavierSansFil,
    dec: "Clavier sans fil pratique grâce au Bluetooth ou à un récepteur USB, et qui est conçu pour être facile et agréable à utiliser.",
  },

  {
    id: "p15",
    title: "SOURIS SANS FIL",
    price: 3800,
    img: sourisSansFil,
    dec: "Souris sans fil confortable et conçue pour être facile à utiliser et adaptée aux tâches quotidiennes sur ordinateur.",
  },

  {
    id: "p16",
    title: "SMARTPHONE SAMSUNG GALAXY A16",
    price: 39000,
    img: galaxyA16,
    dec: "Smartphone Samsung Galaxy A16 conçu pour une utilisation quotidienne fluide.",
  },

  {
    id: "p17",
    title: "COQUE ANTICHOC POUR SMARTPHONE",
    price: 1500,
    img: coqueSmartphone,
    dec: "Coque résistante aux chocs, conçue pour protéger votre smartphone contre les chutes, les coups et les impacts.",
  },

  {
    id: "p18",
    title: "CHARGEUR RAPIDE USB-C 20W",
    price: 2500,
    img: chargeurUsbC,
    dec: "Chargeur rapide USB-C 20W permettant de recharger rapidement les appareils compatibles.",
  },

  {
    id: "p19",
    title: "POWER BANK 10 000 mAh",
    price: 3500,
    img: powerbank,
    dec: "Une batterie externe d’une capacité de 10 000 mAh, pratique pour recharger votre smartphone lorsque sa batterie est faible.",
  },

  {
    id: "p20",
    title: "CAMÉRA DE SURVEILLANCE WI-FI",
    price: 5500,
    img: cameraWifi,
    dec: "Caméra de surveillance qui se connecte au Wi-Fi et vous permet de surveiller votre maison à distance, afin de garder un œil.",
  },

  {
    id: "p21",
    title: "AMPOULE LED INTELLIGENTE WI-FI",
    price: 2000,
    img: ampouleWifi,
    dec: "Ampoule LED connectée au Wi-Fi qui permet de contrôler facilement l’éclairage, par exemple depuis un smartphone.",
  },

  {
    id: "p22",
    title: "PRISE INTELLIGENTE WI-FI",
    price: 2500,
    img: priseWifi,
    dec: "Prise intelligente Wi-Fi permettant de contrôler vos appareils électriques à distance.",
  },

  {
    id: "p23",
    title: "SONNETTE VIDÉO CONNECTÉE",
    price: 8500,
    img: sonnetteVideo,
    dec: "Sonnette équipée d’une caméra et connectée à Internet, qui permet de voir et de surveiller ce qui se passe.",
  },

  {
    id: "p24",
    title: "CAPTEUR DE MOUVEMENT INTELLIGENT",
    price: 3000,
    img: capteurMouvement,
    dec: "Capteur connecté qui détecte les mouvements dans une pièce ou un espace et peut vous alerter.",
  },
];

// ===============================
// PRODUCT CARD
// ===============================

function ProductCard({ id,title, price, img, dec }) {
  const navigate = useNavigate();
  return (
    <div className="product-card" onClick={() => navigate(`/products/${id}`)}>

      <div className="image-container">
        <img
          src={img}
          alt={title}
          className="product-image"
        />
      </div>

      <h2>{title}</h2>

      <p className="description">
        {dec}
      </p>

      <div className="price-container">
        <span className="price">
          {price.toLocaleString("fr-DZ")} DA
        </span>
      </div>

      <button
        className="cart-button"
        type="button"
      >
        Ajouter au panier
      </button>

    </div>
  );
}

// ===============================
// PRODUCT LIST
// RECHERCHE + TRI + PAGINATION
// ===============================

function ProductList() {

  // ===============================
  // RECHERCHE
  // ===============================

  const [search, setSearch] = useState("");

  // ===============================
  // TRI PAR PRIX
  // ===============================

  const [sortPrice, setSortPrice] = useState("");

  // ===============================
  // PAGINATION
  // ===============================

  const [currentPage, setCurrentPage] = useState(1);

  const [pageSize, setPageSize] = useState(8);

  // ===============================
  // FILTRAGE + RECHERCHE + TRI
  // ===============================

  const filteredProducts = products
    .filter((product) => {

      const searchValue = search
        .toLowerCase()
        .trim();

      return (
        product.title
          .toLowerCase()
          .includes(searchValue) ||

        product.dec
          .toLowerCase()
          .includes(searchValue)
      );
    })

    .sort((a, b) => {

      // Prix croissant
      if (sortPrice === "asc") {
        return a.price - b.price;
      }

      // Prix décroissant
      if (sortPrice === "desc") {
        return b.price - a.price;
      }

      // Aucun tri
      return 0;
    });

  // ===============================
  // NOMBRE TOTAL DE PAGES
  // ===============================

  const totalPages = Math.ceil(
    filteredProducts.length / pageSize
  );

  // ===============================
  // PRODUITS DE LA PAGE
  // ===============================

  const startIndex =
    (currentPage - 1) * pageSize;

  const currentProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + pageSize
    );

  // ===============================
  // RECHERCHE
  // ===============================

  const handleSearch = (e) => {

    setSearch(e.target.value);

    // Revenir à la première page
    setCurrentPage(1);
  };

  // ===============================
  // EFFACER LA RECHERCHE
  // ===============================

  const clearSearch = () => {

    setSearch("");

    setCurrentPage(1);
  };

  // ===============================
  // TRI PAR PRIX
  // ===============================

  const handleSortChange = (e) => {

    setSortPrice(e.target.value);

    // Revenir à la première page
    setCurrentPage(1);
  };

  // ===============================
  // CHANGEMENT DE PAGE
  // ===============================

  const changePage = (page) => {

    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ===============================
  // CHANGEMENT DU NOMBRE DE PRODUITS
  // ===============================

  const handlePageSizeChange = (e) => {

    const newSize =
      Number(e.target.value);

    setPageSize(newSize);

    setCurrentPage(1);
  };

  // ===============================
  // PAGES À AFFICHER
  // ===============================

  const getPages = () => {

    if (totalPages <= 7) {

      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    if (currentPage <= 3) {

      return [
        1,
        2,
        3,
        "...",
        totalPages,
      ];
    }

    if (
      currentPage >=
      totalPages - 2
    ) {

      return [
        1,
        "...",
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (

    <div className="product-container">

      {/* ===============================
          MINI NAVBAR
      =============================== */}

      <div className="products-navbar">

       
        {/* ===============================
            TRI
        =============================== */}

        <div className="sort-container">

          <label htmlFor="sortPrice">
            Trier par :
          </label>

          <select
            id="sortPrice"
            value={sortPrice}
            onChange={handleSortChange}
          >

            <option value="">
              Prix
            </option>

            <option value="asc">
              Prix croissant
            </option>

            <option value="desc">
              Prix décroissant
            </option>

          </select>

        </div>

        {/* ===============================
            RECHERCHE
        =============================== */}

        <div className="search-container">

          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={handleSearch}
          />

          {search && (

            <button
              className="clear-search"
              type="button"
              onClick={clearSearch}
            >
              ✕
            </button>

          )}

        </div>

      </div>

      {/* ===============================
          RÉSULTAT RECHERCHE
      =============================== */}

      {search && (

        <p className="search-result">

          {filteredProducts.length} produit
          {filteredProducts.length > 1
            ? "s"
            : ""}

          {" "}trouvé
          {filteredProducts.length > 1
            ? "s"
            : ""}

        </p>

      )}

      {/* ===============================
          PRODUITS
      =============================== */}

      {currentProducts.length > 0 ? (

        <div className="products-list">

          {currentProducts.map(
            (product) => (

              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                img={product.img}
                dec={product.dec}
              />

            )
          )}

        </div>

      ) : (

        // ===============================
        // AUCUN PRODUIT
        // ===============================

        <div className="no-products">

          <h2>
            Aucun produit trouvé
          </h2>

          <p>
            Aucun produit ne correspond
            à votre recherche.
          </p>

          <button
            type="button"
            onClick={clearSearch}
          >
            Afficher tous les produits
          </button>

        </div>

      )}

      {/* ===============================
          PAGINATION
      =============================== */}

      {filteredProducts.length > 0 && (

        <div className="premium-pagination">

          {/* PREVIOUS */}

          <button
            className="pagination-arrow"
            disabled={currentPage === 1}
            onClick={() =>
              changePage(currentPage - 1)
            }
          >
            ‹
          </button>

          {/* NUMÉROS */}

          <div className="pagination-pages">

            {getPages().map(
              (page, index) => {

                if (page === "...") {

                  return (
                    <span
                      key={`dots-${index}`}
                      className="pagination-dots"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={page}
                    className={`pagination-page ${
                      currentPage === page
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      changePage(page)
                    }
                  >
                    {page}
                  </button>
                );
              }
            )}

          </div>

          {/* NEXT */}

          <button
            className="pagination-arrow"
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              changePage(currentPage + 1)
            }
          >
            ›
          </button>

          {/* SÉPARATEUR */}

          <div className="pagination-divider" />

          {/* NOMBRE PAR PAGE */}

          <select
            className="pagination-select"
            value={pageSize}
            onChange={
              handlePageSizeChange
            }
          >

            <option value={8}>
              8 / page
            </option>

            <option value={16}>
              16 / page
            </option>

            <option value={32}>
              32 / page
            </option>

            <option value={64}>
              64 / page
            </option>

          </select>

          {/* GO TO PAGE */}

          <div className="goto-container">

            <span>
              Go to
            </span>

            <input
              className="goto-input"
              type="number"
              min="1"
              max={totalPages}
              placeholder={currentPage}

              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  const page =
                    Number(e.target.value);

                  if (
                    page >= 1 &&
                    page <= totalPages
                  ) {

                    changePage(page);

                    e.target.value = "";
                  }
                }

              }}
            />

            <span>
              Page
            </span>

          </div>

        </div>
      )}

    </div>
  );
}

// ===============================
// EXPORT
// ===============================

export default ProductList;

