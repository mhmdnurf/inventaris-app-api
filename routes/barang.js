import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Barang } from "../models/Barang.js";
const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.get("/master-barang", async (req, res) => {
  const allBarang = await Barang.find();
  try {
    res.status(200).json({
      message: "Data Barang berhasil diambil!",
      barang: allBarang,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam mengambil data barang",
      error: error.message,
    });
  }
});

export default router;
