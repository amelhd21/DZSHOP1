import { Link } from "react-router-dom";
import {
  FaBox,
  FaShoppingCart,
  FaCheckCircle,
  FaClock,
  FaMoneyBillWave,
  FaUsers,
  FaPlus,
  FaExclamationTriangle
} from "react-icons/fa";

import AdminSidebar from "../components/AdminSidebar";
import "./AdminDashboard.css";

import { useEffect, useState } from "react";
import { apiFetch, lireJson } from "../api";

function AdminDashboard() {

  const [stats, setStats] = useState({
    users: 0,
    clients: 0,
    products: 0,

    orders: 0,
    deliveredOrders: 0,
    pendingOrders: 0,
    cancelledOrders: 0,

    revenue: 0,
    todayRevenue: 0,

    recentOrders: [],
    topProducts: []
  });

  useEffect(function () {

    async function chargerStats() {

      try {

        const data = await lireJson(
          await apiFetch("/api/admin/stats")
        );

        setStats(data);

      } catch (err) {

        console.error(
          "Erreur statistiques :",
          err.message
        );

      }

    }

    chargerStats();

  }, []);


  return (

    <div className="admin-dashboard">

      <AdminSidebar />

      <main className="admin-main">

        <div className="admin-header">

          <div>

            <h1>
              Dashboard Admin
            </h1>

            <p>
              Vue générale de votre boutique DZShop
            </p>

          </div>

          <Link
            to="/admin/products"
            className="add-product-btn"
          >

            <FaPlus />

            Ajouter un produit

          </Link>

        </div>


        {/* ========================= */}
        {/* STATISTIQUES */}
        {/* ========================= */}

        <div className="stats-grid">


          {/* UTILISATEURS */}

          <div className="stat-card">

            <div className="stat-icon">
              <FaUsers />
            </div>

            <div>

              <span>
                Utilisateurs
              </span>

              <h2>
                {stats.users}
              </h2>

            </div>

          </div>


          {/* COMMANDES */}

          <div className="stat-card">

            <div className="stat-icon">
              <FaShoppingCart />
            </div>

            <div>

              <span>
                Commandes
              </span>

              <h2>
                {stats.orders}
              </h2>

            </div>

          </div>


          {/* LIVRÉES */}

          <div className="stat-card">

            <div className="stat-icon">
              <FaCheckCircle />
            </div>

            <div>

              <span>
                Livrées
              </span>

              <h2>
                {stats.deliveredOrders}
              </h2>

            </div>

          </div>


          {/* EN ATTENTE */}

          <div className="stat-card">

            <div className="stat-icon">
              <FaClock />
            </div>

            <div>

              <span>
                En attente
              </span>

              <h2>
                {stats.pendingOrders}
              </h2>

            </div>

          </div>


          {/* RECETTE DU JOUR */}

          <div className="stat-card">

            <div className="stat-icon">
              <FaMoneyBillWave />
            </div>

            <div>

              <span>
                Recette du jour
              </span>

              <h2>
                {(stats.todayRevenue || 0).toLocaleString()} DA
              </h2>

            </div>

          </div>


          {/* RECETTE TOTALE */}

          <div className="stat-card">

            <div className="stat-icon">
              <FaMoneyBillWave />
            </div>

            <div>

              <span>
                Recette totale
              </span>

              <h2>
                {(stats.revenue || 0).toLocaleString()} DA
              </h2>

            </div>

          </div>


          {/* PRODUITS */}

          <div className="stat-card">

            <div className="stat-icon">
              <FaBox />
            </div>

            <div>

              <span>
                Produits
              </span>

              <h2>
                {stats.products}
              </h2>

            </div>

          </div>


          {/* STOCK */}

          <div className="stat-card warning-card">

            <div className="stat-icon">
              <FaExclamationTriangle />
            </div>

            <div>

              <span>
                Stock faible
              </span>

              <h2>
                —
              </h2>

            </div>

          </div>

        </div>


        {/* ========================= */}
        {/* PARTIE BASSE */}
        {/* ========================= */}

        <div className="dashboard-grid">


          {/* ========================= */}
          {/* DERNIÈRES COMMANDES */}
          {/* ========================= */}

          <section className="dashboard-card">

            <div className="card-header">

              <h3>
                Dernières commandes
              </h3>

              <Link to="/admin/orders">
                Voir tout
              </Link>

            </div>


            <div className="table-wrapper">

              <table>

                <thead>

                  <tr>

                    <th>
                      Commande
                    </th>

                    <th>
                      Client
                    </th>

                    <th>
                      Total
                    </th>

                    <th>
                      Statut
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {stats.recentOrders.length === 0 ? (

                    <tr>

                      <td colSpan="4">
                        Aucune commande
                      </td>

                    </tr>

                  ) : (

                    stats.recentOrders.map((order) => (

                      <tr key={order._id}>

                        <td>
                          {order.reference}
                        </td>

                        <td>
                          {order.client}
                        </td>

                        <td>

                          {(order.total || 0).toLocaleString()} DA

                        </td>

                        <td>

                          <span
                            className={
                              order.status === "Livrée"
                                ? "status delivered"
                                : order.status === "Annulée"
                                ? "status cancelled"
                                : "status pending"
                            }
                          >

                            {order.status}

                          </span>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </section>


          {/* ========================= */}
          {/* PRODUITS LES PLUS VENDUS */}
          {/* ========================= */}

          <section className="dashboard-card">

            <div className="card-header">

              <h3>
                Produits les plus vendus
              </h3>

            </div>


            <div className="top-products">

              {stats.topProducts.length === 0 ? (

                <p>
                  Aucune vente enregistrée
                </p>

              ) : (

                stats.topProducts.map(
                  (product, index) => (

                    <div
                      className="top-product"
                      key={product._id}
                    >

                      <div>

                        <span className="rank">
                          #{index + 1}
                        </span>

                        <p>
                          {product.title}
                        </p>

                      </div>


                      <strong>

                        {product.quantity} ventes

                      </strong>

                    </div>

                  )
                )

              )}

            </div>

          </section>

        </div>

      </main>

    </div>

  );

}

export default AdminDashboard;
