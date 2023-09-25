import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { KategoriBahan } from "../models/KategoriBahan.js";

const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.get("/kategori-bahan", async (req, res) => {
  const allKategori = await KategoriBahan.find();
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

router.post("/kategori-bahan/create", async (req, res) => {
  const newKategori = new KategoriBahan({ ...req.body });

  const existingKategori = await KategoriBahan.findOne({
    nama_kategori: { $regex: new RegExp(newKategori.nama_kategori, "i") },
  });
  if (existingKategori) {
    return res.status(400).json({
      message: "Nama kategori sudah digunakan",
    });
  }

  try {
    const addKategori = await newKategori.save();
    res.status(201).json({
      message: "Data kategori bahan berhasil ditambahkan",
      data: addKategori,
    });
  } catch (err) {
    res.status(400).json({
      message: "Validasi gagal, data gagal ditambahkan",
      error: err.message,
    });
  }
});

export default router;
