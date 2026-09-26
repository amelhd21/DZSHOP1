import { useEffect, useState } from "react";

import AdminSidebar from "../components/AdminSidebar";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";

import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaUsers,
  FaChartLine
} from "react-icons/fa";

import { apiFetch, lireJson } from "../api";




function AdminStats() {


  const [period, setPeriod] = useState("Mois");


  const [stats, setStats] = useState({

    revenue: 0,
    todayRevenue: 0,

    orders: 0,
    clients: 0,
    users: 0,

    products: 0,

    deliveredOrders: 0,
    pendingOrders: 0,
    cancelledOrders: 0,

    topProducts: [],
    recentOrders: []

  });



  useEffect(() => {


    async function loadStats() {


      try {


        const response = await apiFetch(
          "/api/admin/stats"
        );


        const data = await lireJson(response);


        setStats({

          ...data,

          topProducts:
            data.topProducts || [],

          recentOrders:
            data.recentOrders || []

        });


      } catch (error) {


        console.error(
          "Erreur chargement statistiques :",
          error
        );


      }


    }


    loadStats();


  }, []);




  const averageOrder =

    stats.orders > 0

      ? Math.round(
          stats.revenue / stats.orders
        )

      : 0;



  return (

    <div className="admin-dashboard">


      <AdminSidebar />


      <main className="admin-main">
        <div className="stats-grid">


          <StatCard

            icon={<FaMoneyBillWave />}

            title="Chiffre d'affaires"

            value={
              `${stats.revenue.toLocaleString()} DA`
            }

          />



          <StatCard

            icon={<FaShoppingCart />}

            title="Commandes"

            value={stats.orders}

          />



          <StatCard

            icon={<FaUsers />}

            title="Clients"

            value={stats.clients}

          />



          <StatCard

            icon={<FaChartLine />}

            title="Panier moyen"

            value={
              `${averageOrder.toLocaleString()} DA`
            }

          />


        </div>





        <section className="dashboard-card">


          <div className="card-header">

            <h3>
              Évolution des ventes
            </h3>

          </div>



          <SalesChart data={stats.ventes7j || []} />


        </section>






        <section className="dashboard-card">


          <div className="card-header">

            <h3>
              Produits les plus vendus
            </h3>

          </div>



          <div className="top-products">


          {

            stats.topProducts.length === 0 ?


            (

              <p>
                Aucune vente enregistrée
              </p>


            )

            :


            (

              stats.topProducts.map(

                (product,index)=>(


                  <div

                    className="top-product"

                    key={
                      product._id || index
                    }

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

            )

          }


          </div>


        </section>






        <section className="dashboard-card">


          <div className="card-header">

            <h3>
              Dernières commandes
            </h3>


          </div>




          <div className="table-wrapper">


            <table>


              <thead>

                <tr>

                  <th>
                    Référence
                  </th>

                  <th>
                    Client
                  </th>

                  <th>
                    Montant
                  </th>

                  <th>
                    Statut
                  </th>

                </tr>

              </thead>




              <tbody>


              {

                stats.recentOrders.length === 0 ?


                (

                  <tr>

                    <td colSpan="4">

                      Aucune commande

                    </td>

                  </tr>


                )


                :


                (

                  stats.recentOrders.map(

                    (order)=>(


                      <tr

                        key={order._id}

                      >


                        <td>
                          {order.reference}
                        </td>



                        <td>
                          {order.client}
                        </td>



                        <td>

                          {
                            order.total.toLocaleString()
                          }

                          DA

                        </td>



                        <td>

                          <span

                            className={

                              order.status === "Livrée"

                              ?

                              "status delivered"

                              :

                              order.status === "Annulée"

                              ?

                              "status cancelled"

                              :

                              "status pending"

                            }

                          >

                            {order.status}

                          </span>


                        </td>


                      </tr>


                    )

                  )

                )

              }


              </tbody>


            </table>


          </div>


        </section>



      </main>


    </div>


  );


}


export default AdminStats;