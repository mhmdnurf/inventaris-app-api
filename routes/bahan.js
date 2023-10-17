const express = require("express");
const router = express.Router();
const BahanModel = require("../models/BahanModel");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res) => {
  try {
    const bahan = await BahanModel.findAll();
    res.status(200).json({
      message: "Data bahan berhasil diambil!",
      bahan: bahan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam mengambil data",
      error: error.message,
    });
  }
});

module.exports = router;
