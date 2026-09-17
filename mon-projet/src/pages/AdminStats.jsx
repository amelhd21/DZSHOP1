import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import SalesChart from "../components/SalesChart";
import StatCard from "../components/StatCard";

import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaUsers,
  FaChartLine,
  FaArrowUp,
  FaBoxOpen,
  FaTrophy
} from "react-icons/fa";

function AdminStats() {

  const [period, setPeriod] = useState("Mois");

  const statsByPeriod = {
    Aujourdhui: {
      revenue: "125 000 DA",
      orders: 8,
      clients: 5,
      average: "15 625 DA"
    },

    Semaine: {
      revenue: "485 000 DA",
      orders: 24,
      clients: 16,
      average: "20 208 DA"
    },

    Mois: {
      revenue: "1 850 000 DA",
      orders: 86,
      clients: 58,
      average: "21 512 DA"
    },

    Année: {
      revenue: "12 450 000 DA",
      orders: 624,
      clients: 318,
      average: "19 951 DA"
    }
  };

  const currentStats = statsByPeriod[period];

  const topProducts = [
    {
      id: "p1",
      title: "Smartphone Samsung",
      ventes: 28,
      revenue: 560000
    },
    {
      id: "p2",
      title: "Casque Bluetooth",
      ventes: 21,
      revenue: 189000
    },
    {
      id: "p3",
      title: "Montre connectée",
      ventes: 17,
      revenue: 255000
    },
    {
      id: "p4",
      title: "Écouteurs sans fil",
      ventes: 14,
      revenue: 126000
    }
  ];

  const recentActivity = [
    {
      id: 1,
      title: "Nouvelle commande",
      description: "Commande CMD086 enregistrée",
      value: "+ 12 500 DA"
    },
    {
      id: 2,
      title: "Nouvelle commande",
      description: "Commande CMD085 enregistrée",
      value: "+ 8 200 DA"
    },
    {
      id: 3,
      title: "Nouveau client",
      description: "Un nouveau client s'est inscrit",
      value: "Client"
    },
    {
      id: 4,
      title: "Commande livrée",
      description: "Commande CMD082 terminée",
      value: "Livrée"
    }
  ];

  return (
    <div className="admin-dashboard">

      <AdminSidebar />

      <main className="admin-main">

        {/* HEADER */}

        <div className="admin-header">

          <div>
            <h1>Statistiques</h1>

            <p>
              Analyse des performances de DZShop
            </p>
          </div>

          <select
            className="stats-period-select"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="Aujourdhui">
              Aujourd'hui
            </option>

            <option value="Semaine">
              Cette semaine
            </option>

            <option value="Mois">
              Ce mois
            </option>

            <option value="Année">
              Cette année
            </option>
          </select>

        </div>

        {/* CARTES */}

        <div className="stats-grid">

          <StatCard
            title="Chiffre d'affaires"
            value={currentStats.revenue}
            icon={<FaMoneyBillWave />}
            subtitle={`Période : ${period}`}
          />

          <StatCard
            title="Commandes"
            value={currentStats.orders}
            icon={<FaShoppingCart />}
            subtitle={`Période : ${period}`}
          />

          <StatCard
            title="Clients"
            value={currentStats.clients}
            icon={<FaUsers />}
            subtitle="Clients enregistrés"
          />

          <StatCard
            title="Panier moyen"
            value={currentStats.average}
            icon={<FaChartLine />}
            subtitle="Valeur moyenne"
          />

        </div>

        {/* GRAPHIQUE */}

        <section className="stats-chart-card">

          <div className="stats-section-header">

            <div>
              <h2>Évolution des ventes</h2>
              <p>
                Suivi du chiffre d'affaires
              </p>
            </div>

            <div className="stats-growth">
              <FaArrowUp />
              12,5 %
            </div>

          </div>

          <SalesChart />

        </section>

        {/* DEUX COLONNES */}

        <div className="stats-content-grid">

          {/* PRODUITS LES PLUS VENDUS */}

          <section className="stats-panel">

            <div className="stats-section-header">

              <div>
                <h2>Produits les plus vendus</h2>
                <p>Classement actuel</p>
              </div>

              <FaTrophy className="stats-header-icon" />

            </div>

            <div className="stats-products-list">

              {topProducts.map((product, index) => (

                <div
                  className="stats-product"
                  key={product.id}
                >

                  <div className="stats-product-rank">
                    {index + 1}
                  </div>

                  <div className="stats-product-info">

                    <strong>
                      {product.title}
                    </strong>

                    <span>
                      {product.ventes} ventes
                    </span>

                  </div>

                  <div className="stats-product-revenue">
                    {product.revenue.toLocaleString()} DA
                  </div>

                </div>

              ))}

            </div>

          </section>

          {/* ACTIVITÉ */}

          <section className="stats-panel">

            <div className="stats-section-header">

              <div>
                <h2>Activité récente</h2>
                <p>Derniers événements</p>
              </div>

              <FaBoxOpen className="stats-header-icon" />

            </div>

            <div className="stats-activity-list">

              {recentActivity.map(activity => (

                <div
                  className="stats-activity-item"
                  key={activity.id}
                >

                  <div className="stats-activity-dot"></div>

                  <div className="stats-activity-info">

                    <strong>
                      {activity.title}
                    </strong>

                    <span>
                      {activity.description}
                    </span>

                  </div>

                  <div className="stats-activity-value">
                    {activity.value}
                  </div>

                </div>

              ))}

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default AdminStats;
