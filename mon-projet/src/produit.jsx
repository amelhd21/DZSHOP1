import React , { useState, useContext, useEffect } from "react"; 
import { CartContext } from "./contexte/CartContext";
import "./product.css";
import { useNavigate } from 'react-router-dom';
import { apiFetch } from "./api";


// ===============================
// PRODUCT CARD
// ===============================

function ProductCard({ id, title, price, img, dec }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

 const handleAddToCart = (e) => {
    e.stopPropagation();

    addToCart({
      id,
      title,
      price,
      img,
      dec
    });
  };
  

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/products/${id}`)}
    >
      <div className="image-container">
        <img
          src={img}
          alt={title}
          className="product-image"
        />
      </div>

      <h2>{title}</h2>

      <div className="price-container">
        <span className="price">
          {price.toLocaleString("fr-DZ")} DA
        </span>
      </div>

      <button
        className="cart-button"
        type="button"
        onClick={handleAddToCart}
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
  const [apiProducts, setApiProducts] = useState([]);

  useEffect(() => {
    apiFetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setApiProducts(data);
      })
      .catch((err) => {
        console.error("Erreur chargement produits :", err);
      });
  }, []);


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

  const filteredProducts = apiProducts
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
                id={product.id}
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

