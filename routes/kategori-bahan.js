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
      message: "Berhasil mengambil data",
      allKategori,
    });
  } catch (err) {
    res.status(500).json({
      message: "Terjadi kesalahan server",
      error: err.message,
    });
  }
});

router.post("/kategori-bahan/create", async (req, res) => {
  const addKategori = new KategoriBahan({ ...req.body });

  const existingKategori = await KategoriBahan.findOne({
    nama_kategori: { $regex: new RegExp(addKategori.nama_kategori, "i") },
  });
  if (existingKategori) {
    return res.status(400).json({
      message: "Nama kategori sudah digunakan",
    });
  }

  try {
    const newKategori = await addKategori.save();
    res.status(201).json({
      message: "Data berhasil ditambahkan",
      data: newKategori,
    });
  } catch (err) {
    res.status(400).json({
      message: "Validasi gagal, data gagal ditambahkan",
      error: err.message,
    });
  }
});

router.put("/kategori-bahan/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { nama_kategori, keterangan } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "ID tidak boleh kosong",
    });
  }

  const existingKategoriBahan = await KategoriBahan.findOne({
    nama_kategori: { $regex: new RegExp(req.body.nama_kategori, "i") },
    _id: { $ne: id },
  });
  if (existingKategoriBahan) {
    return res.status(400).json({
      message: "Nama kategori sudah digunakan",
    });
  }

  const editKategoriBahan = await KategoriBahan.findById(id);
  if (!editKategoriBahan) {
    return res.status(404).json({
      message: "Data tidak ditemukan",
    });
  }

  editKategoriBahan.nama_kategori = nama_kategori;
  editKategoriBahan.keterangan = keterangan;

  try {
    const updatedKategoriBahan = await editKategoriBahan.save();
    res.status(200).json({
      message: "Data berhasil diubah",
      data: updatedKategoriBahan,
    });
  } catch (err) {
    res.status(400).json({
      message: "Validasi gagal, data gagal diubah",
      error: err.message,
    });
  }
});

router.delete("/kategori-bahan/delete/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "ID tidak boleh kosong",
    });
  }

  try {
    await KategoriBahan.deleteOne({ _id: id });
    res.status(200).json({
      message: "Data berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      message: "Terjadi kesalahan server",
      error: err.message,
    });
  }
});

export default router;
