import express from "express";
import User from "../models/User.js";
import Order from "../models/Order.js";
import { protect, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/customers",
  protect,
  isAdmin,
  async function (req, res) {

    try {

      const users = await User.find({
        role: "client"
      })
        .sort({ createdAt: -1 })
        .lean();


      const customers = await Promise.all(

        users.map(async function (user, index) {

          const orders = await Order.find({
            user: user._id
          }).lean();


          const total = orders
            .filter(order => order.status === "Livrée")
            .reduce(
              (sum, order) => sum + order.total,
              0
            );


          return {

            _id: user._id,

            id:
              "CL" +
              String(index + 1).padStart(3, "0"),

            nom: user.nom,

            email: user.email,

            telephone: user.telephone || "",

            commandes: orders.length,

            total: total,

            statut:
              user.status === "actif"
                ? "Actif"
                : "Inactif",

            inscription:
              new Date(user.createdAt)
                .toLocaleDateString("fr-FR"),

            createdAt: user.createdAt

          };

        })

      );


      res.json(customers);

    } catch (error) {

      console.error(
        "Erreur clients admin :",
        error
      );

      res.status(500).json({
        message:
          "Erreur lors du chargement des clients"
      });

    }

  }
);

export default router;
