import express from 'express'
import User from '../models/User.js'
import Product from '../models/Product.js'
import Order from '../models/Order.js'
import { protect, isAdmin } from '../middleware/auth.js'

const router = express.Router()


router.get('/stats', protect, isAdmin, async (req, res) => {

  try {


    // =========================
    // UTILISATEURS
    // =========================

    const users = await User.countDocuments()

    const clients = await User.countDocuments({
      role: 'client'
    })


    // =========================
    // PRODUITS
    // =========================

    const products = await Product.countDocuments()



    // =========================
    // COMMANDES
    // =========================

    const orders = await Order.countDocuments()


    const deliveredOrders = await Order.countDocuments({
      status: 'Livrée'
    })


    const pendingOrders = await Order.countDocuments({
      status: 'En attente'
    })


    const cancelledOrders = await Order.countDocuments({
      status: 'Annulée'
    })



    // =========================
    // RECETTE TOTALE
    // =========================

    const revenueResult = await Order.aggregate([

      {
        $match:{
          status:'Livrée'
        }
      },

      {
        $group:{
          _id:null,
          total:{
            $sum:'$total'
          }
        }
      }

    ])


    const revenue =
      revenueResult.length
      ?
      revenueResult[0].total
      :
      0




    // =========================
    // RECETTE DU JOUR
    // =========================


    const debutJour = new Date()

    debutJour.setHours(
      0,
      0,
      0,
      0
    )


    const finJour = new Date()

    finJour.setHours(
      23,
      59,
      59,
      999
    )



    const todayRevenueResult =
      await Order.aggregate([


        {
          $match:{
            status:'Livrée',

            createdAt:{
              $gte:debutJour,
              $lte:finJour
            }

          }
        },


        {
          $group:{
            _id:null,

            total:{
              $sum:'$total'
            }

          }
        }


      ])




    const todayRevenue =
      todayRevenueResult.length
      ?
      todayRevenueResult[0].total
      :
      0





    // =========================
    // DERNIERES COMMANDES
    // =========================


    const recentOrders =
      await Order.find()

      .sort({
        createdAt:-1
      })

      .limit(5)

      .select(
        'reference client total status createdAt'
      )






    // =========================
    // PRODUITS LES PLUS VENDUS
    // =========================


    const topProducts =
      await Order.aggregate([


        {
          $match:{
            status:'Livrée'
          }
        },


        {
          $unwind:'$articles'
        },


        {
          $group:{


            _id:'$articles.productId',


            title:{
              $first:'$articles.title'
            },


            quantity:{
              $sum:'$articles.quantity'
            },


            revenue:{
              $sum:{
                $multiply:[
                  '$articles.price',
                  '$articles.quantity'
                ]
              }
            }


          }
        },


        {
          $sort:{
            quantity:-1
          }
        },


        {
          $limit:5
        }


      ])






    res.json({

      users,

      clients,

      products,


      orders,

      deliveredOrders,

      pendingOrders,

      cancelledOrders,


      revenue,

      todayRevenue,


      recentOrders,

      topProducts

    })



  } catch(error) {


    console.error(
      "Erreur statistiques admin :",
      error
    )


    res.status(500).json({

      message:error.message

    })


  }


})



export default router
