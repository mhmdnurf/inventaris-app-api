const express = require("express");
const router = express.Router();
const BarangModel = require("../models/BarangModel");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res) => {
  try {
    const barang = await BarangModel.findAll();
    res.status(200).json({
      message: "Data Barang berhasil diambil!",
      barang: barang,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam mengambil data barang",
      error: error.message,
    });
  }
});

module.exports = router;
