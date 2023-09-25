import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Bahan } from "../models/Bahan.js";

const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.get("/master-bahan", async (req, res) => {
  const allBahan = await Bahan.find().populate("kategori_id");
  try {
    res.status(200).json({
      message: "Berhasil mengambil data bahan",
      data: allBahan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data bahan",
      error: error.message,
    });
  }
});

router.post("/master-bahan/create", async (req, res) => {
  const newBahan = new Bahan({ ...req.body });
  try {
    const addBahan = await newBahan.save();
    res.status(201).json({
      message: "Data bahan berhasil ditambahkan",
      data: addBahan,
    });
  } catch (err) {
    res.status(400).json({
      message: "Validasi gagal, data bahan gagal ditambahkan",
      error: err.message,
    });
  }
});

export default router;
