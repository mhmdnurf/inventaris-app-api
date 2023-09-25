import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Kategori } from "../models/Kategori.js";
const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.get("/kategori", async (req, res) => {
  const allKategori = await Kategori.find();
  try {
    res.status(200).json({
      message: "Berhasil mengambil data kategori",
      data: allKategori,
    });
  } catch (err) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam mengambil data kategori",
      error: err.message,
    });
  }
});

export default router;
