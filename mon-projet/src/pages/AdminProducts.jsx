import { useState,useEffect} from "react";
import AdminSidebar from "../components/AdminSidebar";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
  FaCloudUploadAlt
} from "react-icons/fa";

function AdminProducts() {

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [products, setProducts] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/api/products")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
    })
    .catch((err) => {
      console.error("Erreur chargement produits :", err);
    });
}, []);

  const emptyForm = {
    id: "",
    title: "",
    price: "",
    img: "",
    images: [],
    dec: ""
  };

  const [formData, setFormData] = useState(emptyForm);

  /* =========================
     RECHERCHE
  ========================= */

  const filteredProducts = products.filter((product) => {

    const text = search.toLowerCase();

    return (
      product.title.toLowerCase().includes(text) ||
      product.id.toLowerCase().includes(text) ||
      product.dec.toLowerCase().includes(text)
    );
  });

  /* =========================
     OUVRIR AJOUT
  ========================= */

  function openAddForm() {

    setEditingId(null);

    setFormData(emptyForm);

    setShowForm(true);
  }

  /* =========================
     OUVRIR MODIFICATION
  ========================= */

  function openEditForm(product) {

    setEditingId(product.id);

    setFormData({
      id: product.id,
      title: product.title,
      price: product.price,
      img: product.img,
      images: product.images || [],
      dec: product.dec
    });

    setShowForm(true);
  }

  /* =========================
     FERMER FORMULAIRE
  ========================= */

  function closeForm() {

    setShowForm(false);

    setEditingId(null);

    setFormData(emptyForm);
  }

  /* =========================
     CHAMPS TEXTE
  ========================= */

  function handleChange(e) {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  /* =========================
     IMAGE PRINCIPALE
  ========================= */



async function handleMainImage(e) {

  const file = e.target.files[0];

  if (!file) {
    return;
  }

  try {
    const data = new FormData();
    data.append("image", file);

    const response = await fetch(
      "http://localhost:5000/api/upload",
      {
        method: "POST",
        body: data
      }
    );

    if (!response.ok) {
      throw new Error("Erreur upload image");
    }

    const result = await response.json();

    setFormData((prev) => ({
      ...prev,
      img: "http://localhost:5000" + result.imageUrl
    }));

  } catch (error) {
    console.error("Erreur upload image :", error);
    alert("Impossible d'envoyer l'image.");
  }
}

  /* =========================
     IMAGES SUPPLÉMENTAIRES
  ========================= */

 async function handleAdditionalImages(e) {

  const files = Array.from(e.target.files);

  if (files.length === 0) {
    return;
  }

  try {

    const imageUrls = [];

    for (const file of files) {

      const data = new FormData();
      data.append("image", file);

      const response = await fetch(
        "http://localhost:5000/api/upload",
        {
          method: "POST",
          body: data
        }
      );

      if (!response.ok) {
        throw new Error("Erreur upload image");
      }

      const result = await response.json();

      imageUrls.push(
        "http://localhost:5000" + result.imageUrl
      );
    }

    setFormData((prev) => ({
      ...prev,
      images: imageUrls
    }));

  } catch (error) {

    console.error(
      "Erreur upload images :",
      error
    );

    alert(
      "Impossible d'envoyer les images."
    );
  }
}

  /* =========================
     AJOUT / MODIFICATION
  ========================= */

  function handleSubmit(e) {

    e.preventDefault();

    if (
      !formData.id.trim() ||
      !formData.title.trim() ||
      !formData.price ||
      !formData.dec.trim()
    ) {

      alert(
        "Veuillez remplir tous les champs obligatoires."
      );

      return;
    }

    const price = Number(formData.price);

    if (Number.isNaN(price) || price < 0) {

      alert(
        "Veuillez entrer un prix valide."
      );

      return;
    }

    /* AJOUT */

    if (!editingId) {

      const idExists = products.some(
        (product) =>
          product.id === formData.id.trim()
      );

      if (idExists) {

        alert(
          "Un produit avec cet ID existe déjà."
        );

        return;
      }

      const newProduct = {

        id: formData.id.trim(),

        title: formData.title.trim(),

        price: price,

        img: formData.img,

        images: formData.images,

        dec: formData.dec.trim()
      };

      fetch("http://localhost:5000/api/products", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(newProduct)
})
  .then((res) => {
    if (!res.ok) {
      throw new Error("Erreur lors de l'ajout du produit");
    }

    return res.json();
  })
  .then((createdProduct) => {
    setProducts([
      ...products,
      createdProduct
    ]);

    closeForm();
  })
  .catch((err) => {
    console.error("Erreur ajout produit :", err);
    alert("Impossible d'ajouter le produit.");
  });

return;
    }

    /* MODIFICATION */

    else {

      setProducts(
        products.map((product) =>

          product.id === editingId

            ? {
                id: product.id,

                title:
                  formData.title.trim(),

                price: price,

                img:
                  formData.img,

                images:
                  formData.images,

                dec:
                  formData.dec.trim()
              }

            : product
        )
      );
    }

    closeForm();
  }

  /* =========================
     SUPPRESSION
  ========================= */

  function deleteProduct(id) {

    const confirmation =
      window.confirm(
        "Voulez-vous vraiment supprimer ce produit ?"
      );

    if (!confirmation) {
      return;
    }

    setProducts(
      products.filter(
        (product) =>
          product.id !== id
      )
    );
  }

  return (

    <div className="admin-dashboard">

      {/* SIDEBAR */}

      <AdminSidebar />

      {/* CONTENU */}

      <main className="admin-main">

        {/* HEADER */}

        <div className="admin-header">

          <div>

            <h1>
              Produits
            </h1>

            <p>
              Gérez les produits de votre boutique
            </p>

          </div>

          <button
            className="add-product-btn"
            onClick={openAddForm}
          >

            <FaPlus />

            Ajouter un produit

          </button>

        </div>

        {/* TABLEAU */}

        <section className="dashboard-card">

          {/* RECHERCHE */}

          <div className="product-toolbar">

            <div className="admin-search">

              <FaSearch />

              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          {/* LISTE */}

          <div className="table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>
                    Image
                  </th>

                  <th>
                    ID
                  </th>

                  <th>
                    Produit
                  </th>

                  <th>
                    Prix
                  </th>

                  <th>
                    Description
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredProducts.length > 0 ? (

                  filteredProducts.map(
                    (product) => (

                      <tr key={product.id}>

                        {/* IMAGE */}

                        <td>

                          {product.img ? (

                            <img
                              src={product.img}
                              alt={product.title}
                              className="admin-product-image"
                            />

                          ) : (

                            <div className="admin-no-image">
                              Aucune image
                            </div>

                          )}

                        </td>

                        {/* ID */}

                        <td>

                          {product.id}

                        </td>

                        {/* NOM */}

                        <td>

                          <strong>
                            {product.title}
                          </strong>

                        </td>

                        {/* PRIX */}

                        <td>

                          {product.price.toLocaleString()}
                          {" "}DA

                        </td>

                        {/* DESCRIPTION */}

                        <td>

                          <div className="admin-product-description">

                            {product.dec}

                          </div>

                        </td>

                        {/* ACTIONS */}

                        <td>

                          <div className="action-buttons">

                            <button
                              className="edit-btn"
                              title="Modifier"
                              onClick={() =>
                                openEditForm(product)
                              }
                            >

                              <FaEdit />

                            </button>

                            <button
                              className="delete-btn"
                              title="Supprimer"
                              onClick={() =>
                                deleteProduct(
                                  product.id
                                )
                              }
                            >

                              <FaTrash />

                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="no-admin-products"
                    >

                      Aucun produit trouvé.

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </section>

      </main>

      {/* =====================================
          PANNEAU AJOUT / MODIFICATION
      ===================================== */}

      {showForm && (

        <div
          className="product-modal-overlay"
          onClick={closeForm}
        >

          <div
            className="product-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER FORMULAIRE */}

            <div className="product-modal-header">

              <h2>

                {editingId
                  ? "Modifier le produit"
                  : "Ajouter un produit"}

              </h2>

              <button
                type="button"
                className="product-modal-close"
                onClick={closeForm}
              >

                <FaTimes />

              </button>

            </div>

            {/* FORMULAIRE */}

            <form
              onSubmit={handleSubmit}
              className="product-form"
            >

              {/* ID + NOM */}

              <div className="product-form-row">

                <div className="product-form-group">

                  <label>

                    ID du produit

                    <span>
                      *
                    </span>

                  </label>

                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="Exemple : p25"
                    disabled={
                      editingId !== null
                    }
                  />

                </div>

                <div className="product-form-group">

                  <label>

                    Nom du produit

                    <span>
                      *
                    </span>

                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Nom du produit"
                  />

                </div>

              </div>

              {/* PRIX */}

              <div className="product-form-group">

                <label>

                  Prix (DA)

                  <span>
                    *
                  </span>

                </label>

                <input
                  type="number"
                  name="price"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Exemple : 5500"
                />

              </div>

              {/* IMAGE PRINCIPALE */}

              <div className="product-form-group">

                <label>
                  Image principale
                </label>

                <label className="product-upload-box">

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImage}
                  />

                  {formData.img ? (

                    <img
                      src={formData.img}
                      alt="Aperçu du produit"
                      className="product-upload-preview"
                    />

                  ) : (

                    <>

                      <FaCloudUploadAlt
                        className="upload-icon"
                      />

                      <strong>

                        Cliquez pour choisir une image

                      </strong>

                      <small>

                        PNG, JPG, JPEG

                      </small>

                    </>

                  )}

                </label>

              </div>

              {/* IMAGES SUPPLÉMENTAIRES */}

              <div className="product-form-group">

                <label>

                  Images supplémentaires

                </label>

                <label className="product-upload-box">

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={
                      handleAdditionalImages
                    }
                  />

                  <FaCloudUploadAlt
                    className="upload-icon"
                  />

                  <strong>

                    Cliquez pour sélectionner plusieurs images

                  </strong>

                  <small>

                    PNG, JPG, JPEG

                  </small>

                </label>

                {/* APERÇUS */}

                {formData.images.length > 0 && (

                  <div className="product-images-preview">

                    {formData.images.map(
                      (image, index) => (

                        <img
                          key={index}
                          src={image}
                          alt={`Produit ${index + 1}`}
                        />

                      )
                    )}

                  </div>

                )}

              </div>

              {/* DESCRIPTION */}

              <div className="product-form-group">

                <label>

                  Description du produit

                  <span>
                    *
                  </span>

                </label>

                <textarea
                  name="dec"
                  rows="5"
                  maxLength="500"
                  value={formData.dec}
                  onChange={handleChange}
                  placeholder="Description du produit..."
                />

                <div className="description-counter">

                  {formData.dec.length}/500

                </div>

              </div>

              {/* BOUTONS */}

              <div className="product-form-actions">

                <button
                  type="button"
                  className="product-cancel-btn"
                  onClick={closeForm}
                >

                  Annuler

                </button>

                <button
                  type="submit"
                  className="product-submit-btn"
                >

                  <FaPlus />

                  {editingId
                    ? "Enregistrer"
                    : "Ajouter le produit"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminProducts;
