import express from "express";
import User from "../models/User.js";
import Order from "../models/Order.js";
import { protect, isAdmin } from "../middleware/auth.js";

const router = express.Router();


// =========================
// RÉCUPÉRER LES UTILISATEURS
// =========================

router.get(
  "/users",
  protect,
  isAdmin,
  async function (req, res) {

    try {

      const users = await User.find()
        .sort({ createdAt: -1 })
        .lean();


      const result = await Promise.all(

        users.map(async function (user) {

          const orders = await Order.find({
            user: user._id
          }).lean();


          const total = orders
            .filter(
              order => order.status === "Livrée"
            )
            .reduce(
              (sum, order) =>
                sum + order.total,
              0
            );


          return {

            _id: user._id,

            nom: user.nom,

            email: user.email,

            role: user.role,

            status: user.status,

            orders: orders.length,

            total: total,

            date: new Date(
              user.createdAt
            ).toLocaleDateString("fr-FR")

          };

        })

      );


      res.json(result);

    } catch (error) {

      console.error(
        "Erreur utilisateurs admin :",
        error
      );

      res.status(500).json({
        message:
          "Erreur lors du chargement des utilisateurs"
      });

    }

  }
);


// =========================
// CHANGER LE STATUT
// =========================

router.patch(
  "/users/:id/status",
  protect,
  isAdmin,
  async function (req, res) {

    try {

      const { status } = req.body;


      if (
        status !== "actif" &&
        status !== "bloque"
      ) {

        return res.status(400).json({
          message: "Statut invalide"
        });

      }


      const user = await User.findById(
        req.params.id
      );


      if (!user) {

        return res.status(404).json({
          message:
            "Utilisateur introuvable"
        });

      }
      // Garde-fou : un admin ne peut pas modifier son propre compte
      if (String(user._id) === String(req.user._id)) {
        return res.status(400).json({
          message: 'Tu ne peux pas modifier ton propre compte'
        });
      }



      user.status = status;

      await user.save();


      res.json({
        _id: user._id,
        status: user.status
      });


    } catch (error) {

      console.error(
        "Erreur modification statut :",
        error
      );

      res.status(500).json({
        message:
          "Erreur lors de la modification du statut"
      });

    }

  }
);


// =========================
// CHANGER LE RÔLE
// =========================

router.patch(
  "/users/:id/role",
  protect,
  isAdmin,
  async function (req, res) {

    try {

      const { role } = req.body;


      if (
        role !== "client" &&
        role !== "admin"
      ) {

        return res.status(400).json({
          message: "Rôle invalide"
        });

      }


      const user = await User.findById(
        req.params.id
      );


      if (!user) {

        return res.status(404).json({
          message:
            "Utilisateur introuvable"
        });

      }
      // Garde-fou : un admin ne peut pas modifier son propre compte
      if (String(user._id) === String(req.user._id)) {
        return res.status(400).json({
          message: 'Tu ne peux pas modifier ton propre compte'
        });
      }



      user.role = role;

      await user.save();


      res.json({
        _id: user._id,
        role: user.role
      });


    } catch (error) {

      console.error(
        "Erreur modification rôle :",
        error
      );

      res.status(500).json({
        message:
          "Erreur lors de la modification du rôle"
      });

    }

  }
);


// =========================
// SUPPRIMER UN UTILISATEUR
// =========================

router.delete(
  "/users/:id",
  protect,
  isAdmin,
  async function (req, res) {

    try {

      const user = await User.findById(
        req.params.id
      );


      if (!user) {

        return res.status(404).json({
          message:
            "Utilisateur introuvable"
        });

      }


      if (user.role === "admin") {

        return res.status(403).json({
          message:
            "La suppression d'un administrateur est interdite"
        });

      }


      await User.findByIdAndDelete(
        req.params.id
      );


      res.json({
        message:
          "Utilisateur supprimé"
      });


    } catch (error) {

      console.error(
        "Erreur suppression utilisateur :",
        error
      );

      res.status(500).json({
        message:
          "Erreur lors de la suppression"
      });

    }

  }
);


export default router;