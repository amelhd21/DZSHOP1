import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { apiFetch, lireJson } from "../api";

import {
  FaShoppingCart,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSearch,
  FaEye,
  FaTimes
} from "react-icons/fa";


function AdminOrders() {

  const [orders, setOrders] = useState([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("Toutes");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [loading, setLoading] = useState(true);


  // =========================
  // CHARGER LES COMMANDES
  // =========================

  useEffect(function () {

    async function chargerCommandes() {

      try {

        const data = await lireJson(
          await apiFetch("/api/orders")
        );

        setOrders(data);

      } catch (err) {

        console.error(
          "Erreur chargement commandes :",
          err.message
        );

      } finally {

        setLoading(false);

      }

    }

    chargerCommandes();

  }, []);


  // =========================
  // STATISTIQUES
  // =========================

  const totalOrders = orders.length;


  const delivered = orders.filter(
    order => order.status === "Livrée"
  ).length;


  const pending = orders.filter(
    order => order.status === "En attente"
  ).length;


  const cancelled = orders.filter(
    order => order.status === "Annulée"
  ).length;


  // =========================
  // RECHERCHE + FILTRE
  // =========================

  const filteredOrders = orders.filter(order => {

    const searchValue =
      search.toLowerCase();


    const searchMatch =

      (order.id || "")
        .toLowerCase()
        .includes(searchValue)

      ||

      (order.client || "")
        .toLowerCase()
        .includes(searchValue);


    let filterMatch = true;


    if (filter === "Livrées") {

      filterMatch =
        order.status === "Livrée";

    }


    if (filter === "En attente") {

      filterMatch =
        order.status === "En attente";

    }


    if (filter === "Annulées") {

      filterMatch =
        order.status === "Annulée";

    }


    return searchMatch && filterMatch;

  });


  // =========================
  // CHANGER LE STATUT
  // =========================

  async function changeStatus(order) {

    let newStatus;


    if (order.status === "En attente") {

      newStatus = "Livrée";

    }

    else if (order.status === "Livrée") {

      newStatus = "Annulée";

    }

    else {

      newStatus = "En attente";

    }


    try {

      const updatedOrder = await lireJson(

        await apiFetch(
          `/api/orders/${order._id}/status`,
          {
            method: "PATCH",

            body: JSON.stringify({
              status: newStatus
            })
          }
        )

      );


      setOrders(previousOrders =>

        previousOrders.map(item =>

          item._id === updatedOrder._id
            ? updatedOrder
            : item

        )

      );


      if (
        selectedOrder &&
        selectedOrder._id === updatedOrder._id
      ) {

        setSelectedOrder(updatedOrder);

      }


    } catch (err) {

      console.error(
        "Erreur changement statut :",
        err.message
      );

      alert(
        "Impossible de modifier le statut de la commande."
      );

    }

  }


  return (

    <div className="admin-dashboard">


      <AdminSidebar />


      <main className="admin-main">


        <div className="admin-header">

          <div>

            <h1>
              Commandes
            </h1>

            <p>
              Gestion des commandes clients
            </p>

          </div>

        </div>


        {/* ========================= */}
        {/* STATISTIQUES */}
        {/* ========================= */}

        <div className="stats-grid">


          <div className="stat-card">

            <div className="stat-icon">
              <FaShoppingCart />
            </div>

            <div>

              <span>
                Total commandes
              </span>

              <h2>
                {totalOrders}
              </h2>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              <FaCheckCircle />
            </div>

            <div>

              <span>
                Livrées
              </span>

              <h2>
                {delivered}
              </h2>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              <FaClock />
            </div>

            <div>

              <span>
                En attente
              </span>

              <h2>
                {pending}
              </h2>

            </div>

          </div>


          <div className="stat-card warning-card">

            <div className="stat-icon">
              <FaTimesCircle />
            </div>

            <div>

              <span>
                Annulées
              </span>

              <h2>
                {cancelled}
              </h2>

            </div>

          </div>


        </div>


        {/* ========================= */}
        {/* TABLEAU */}
        {/* ========================= */}

        <section className="dashboard-card">


          <div className="users-toolbar">


            <div className="users-search">

              <FaSearch />

              <input

                type="text"

                placeholder="Rechercher une commande ou un client..."

                value={search}

                onChange={(e) =>
                  setSearch(e.target.value)
                }

              />

            </div>


            <select

              className="users-filter"

              value={filter}

              onChange={(e) =>
                setFilter(e.target.value)
              }

            >

              <option>
                Toutes
              </option>

              <option>
                Livrées
              </option>

              <option>
                En attente
              </option>

              <option>
                Annulées
              </option>

            </select>


          </div>


          <div className="table-wrapper">


            <table className="admin-table">


              <thead>

                <tr>

                  <th>
                    ID
                  </th>

                  <th>
                    Client
                  </th>

                  <th>
                    Date
                  </th>

                  <th>
                    Montant
                  </th>

                  <th>
                    Statut
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>


                {loading ? (

                  <tr>

                    <td colSpan="6">
                      Chargement des commandes...
                    </td>

                  </tr>

                ) : filteredOrders.length === 0 ? (

                  <tr>

                    <td colSpan="6">
                      Aucune commande trouvée
                    </td>

                  </tr>

                ) : (

                  filteredOrders.map(order => (


                    <tr key={order._id}>


                      <td>
                        {order.id}
                      </td>


                      <td>
                        {order.client}
                      </td>


                      <td>
                        {order.date}
                      </td>


                      <td>

                        {(order.total || 0).toLocaleString()} DA

                      </td>


                      <td>

                        <span

                          className={

                            order.status === "Livrée"

                              ? "status delivered"

                              : order.status === "En attente"

                              ? "status pending"

                              : "status cancelled"

                          }

                        >

                          {order.status}

                        </span>

                      </td>


                      <td>


                        <div className="user-actions">


                          <button

                            className="user-action view-action"

                            onClick={() =>
                              setSelectedOrder(order)
                            }

                          >

                            <FaEye />

                          </button>


                          <button

                            className="user-action block-action"

                            onClick={() =>
                              changeStatus(order)
                            }

                          >

                            Changer

                          </button>


                        </div>


                      </td>


                    </tr>


                  ))

                )}


              </tbody>


            </table>


          </div>


        </section>


      </main>


      {/* ========================= */}
      {/* FENÊTRE DÉTAILS */}
      {/* ========================= */}

      {selectedOrder && (


        <div

          className="user-modal-overlay"

          onClick={() =>
            setSelectedOrder(null)
          }

        >


          <div

            className="user-modal"

            onClick={(e) =>
              e.stopPropagation()
            }

          >


            <button

              className="product-modal-close"

              onClick={() =>
                setSelectedOrder(null)
              }

            >

              <FaTimes />

            </button>


            <h2>
              Détails commande
            </h2>


            <p>
              {selectedOrder.id}
            </p>


            <div className="user-details">


              <div>

                <span>
                  Client
                </span>

                <strong>
                  {selectedOrder.client}
                </strong>

              </div>


              <div>

                <span>
                  Date
                </span>

                <strong>
                  {selectedOrder.date}
                </strong>

              </div>


              <div>

                <span>
                  Montant
                </span>

                <strong>

                  {(selectedOrder.total || 0).toLocaleString()} DA

                </strong>

              </div>


              <div>

                <span>
                  Statut
                </span>

                <strong>
                  {selectedOrder.status}
                </strong>

              </div>


              {selectedOrder.telephone && (

                <div>

                  <span>
                    Téléphone
                  </span>

                  <strong>
                    {selectedOrder.telephone}
                  </strong>

                </div>

              )}


              {selectedOrder.wilaya && (

                <div>

                  <span>
                    Wilaya
                  </span>

                  <strong>
                    {selectedOrder.wilaya}
                  </strong>

                </div>

              )}


              {selectedOrder.commune && (

                <div>

                  <span>
                    Commune
                  </span>

                  <strong>
                    {selectedOrder.commune}
                  </strong>

                </div>

              )}


              {selectedOrder.adresse && (

                <div>

                  <span>
                    Adresse
                  </span>

                  <strong>
                    {selectedOrder.adresse}
                  </strong>

                </div>

              )}


            </div>


          </div>


        </div>


      )}


    </div>

  );

}
export default AdminOrders;