import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const nomUnique =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1E9) +
      path.extname(file.originalname);

    cb(null, nomUnique);
  }
});

const upload = multer({
  storage: storage
});

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      erreur: "Aucune image envoyée"
    });
  }

  res.status(201).json({
    imageUrl: "/uploads/" + req.file.filename
  });
});

export default router;
