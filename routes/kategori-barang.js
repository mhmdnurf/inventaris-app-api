import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { KategoriBarang } from "../models/KategoriBarang.js";
const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.get("/kategori-barang", async (req, res) => {
  const allKategori = await KategoriBarang.find();
  try {
    res.status(200).json({
      message: "Berhasil mengambil data",
      data: allKategori,
    });
  } catch (err) {
    res.status(500).json({
      message: "Terjadi kesalahan server",
      error: err.message,
    });
  }
});

router.post("/kategori-barang/create", async (req, res) => {
  const addKategori = new KategoriBarang({ ...req.body });

  const existingKategori = await KategoriBarang.findOne({
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

router.put("/kategori-barang/edit/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "ID tidak boleh kosong",
    });
  }

  const existingKategoriBarang = await KategoriBarang.findOne({
    nama_kategori: { $regex: new RegExp(req.body.nama_kategori, "i") },
    _id: { $ne: id },
  });
  if (existingKategoriBarang) {
    return res.status(400).json({
      message: "Nama kategori sudah digunakan",
    });
  }

  const editKategoriBarang = await KategoriBarang.findById(id);
  if (!editKategoriBarang) {
    return res.status(404).json({
      message: "Data tidak ditemukan",
    });
  }

  editKategoriBarang.nama_kategori = req.body.nama_kategori;
  try {
    const updatedKategoriBahan = await editKategoriBarang.save();
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

router.delete("/kategori-barang/delete/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "ID tidak boleh kosong",
    });
  }

  try {
    await KategoriBarang.deleteOne({ _id: id });
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
