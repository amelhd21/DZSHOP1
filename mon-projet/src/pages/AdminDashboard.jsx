import { Link } from "react-router-dom";
import {
  FaBox,
  FaShoppingCart,
  FaCheckCircle,
  FaClock,
  FaMoneyBillWave,
  FaUsers,
  FaChartLine,
  FaPlus,
  FaExclamationTriangle
} from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";
import OrdersTable from "../components/OrdersTable";
import "./AdminDashboard.css";

function AdminDashboard() {

  const stats = {
    visitors: 1254,
    totalOrders: 86,
    deliveredOrders: 61,
    pendingOrders: 25,
    todayRevenue: 125000,
    totalRevenue: 1850000,
    products: 24,
    lowStock: 4
  };

  const recentOrders = [
    {
      id: "CMD001",
      client: "Ahmed",
      total: 12500,
      status: "Livrée"
    },
    {
      id: "CMD002",
      client: "Sofiane",
      total: 8200,
      status: "En attente"
    },
    {
      id: "CMD003",
      client: "Yacine",
      total: 15600,
      status: "Livrée"
    },
    {
      id: "CMD004",
      client: "Karim",
      total: 7400,
      status: "En attente"
    }
  ];

  const topProducts = [
    {
      name: "Souris Gaming Logitech G102",
      sales: 42
    },
    {
      name: "Clavier Gaming",
      sales: 31
    },
    {
      name: "Casque Bluetooth",
      sales: 25
    }
  ];

  return (
    <div className="admin-dashboard">

      <AdminSidebar />

      <main className="admin-main">

        <div className="admin-header">

          <div>
            <h1>Dashboard Admin</h1>
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

        <div className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers />
            </div>

            <div>
              <span>Visiteurs</span>
              <h2>{stats.visitors}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaShoppingCart />
            </div>

            <div>
              <span>Commandes</span>
              <h2>{stats.totalOrders}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>

            <div>
              <span>Livrées</span>
              <h2>{stats.deliveredOrders}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaClock />
            </div>

            <div>
              <span>Non livrées</span>
              <h2>{stats.pendingOrders}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaMoneyBillWave />
            </div>

            <div>
              <span>Recette du jour</span>
              <h2>
                {stats.todayRevenue.toLocaleString()} DA
              </h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaMoneyBillWave />
            </div>

            <div>
              <span>Recette totale</span>
              <h2>
                {stats.totalRevenue.toLocaleString()} DA
              </h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaBox />
            </div>

            <div>
              <span>Produits</span>
              <h2>{stats.products}</h2>
            </div>
          </div>

          <div className="stat-card warning-card">
            <div className="stat-icon">
              <FaExclamationTriangle />
            </div>

            <div>
              <span>Stock faible</span>
              <h2>{stats.lowStock}</h2>
            </div>
          </div>

        </div>

        <div className="dashboard-grid">

          <section className="dashboard-card">

            <div className="card-header">
              <h3>Dernières commandes</h3>

              <Link to="/admin/orders">
                Voir tout
              </Link>
            </div>

            <div className="table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>Commande</th>
                    <th>Client</th>
                    <th>Total</th>
                    <th>Statut</th>
                  </tr>
                </thead>

                <tbody>

                  {recentOrders.map((order) => (

                    <tr key={order.id}>

                      <td>{order.id}</td>

                      <td>{order.client}</td>

                      <td>
                        {order.total.toLocaleString()} DA
                      </td>

                      <td>

                        <span
                          className={
                            order.status === "Livrée"
                              ? "status delivered"
                              : "status pending"
                          }
                        >
                          {order.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>

          <section className="dashboard-card">

            <div className="card-header">
              <h3>Produits les plus vendus</h3>
            </div>

            <div className="top-products">

              {topProducts.map((product, index) => (

                <div
                  className="top-product"
                  key={index}
                >

                  <div>

                    <span className="rank">
                      #{index + 1}
                    </span>

                    <p>
                      {product.name}
                    </p>

                  </div>

                  <strong>
                    {product.sales} ventes
                  </strong>

                </div>

              ))}

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;