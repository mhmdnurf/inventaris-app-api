import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Barang } from "../models/Barang.js";
import { KategoriBarang } from "../models/KategoriBarang.js";
import { Satuan } from "../models/Satuan.js";
const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.get("/master-barang", async (req, res) => {
  const allBarang = await Barang.find()
    .populate("kategoriBarang")
    .populate("satuanBarang");
  try {
    res.status(200).json({
      message: "Berhasil mengambil data",
      data: allBarang,
    });
  } catch (err) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam mengambil data barang",
      error: err.message,
    });
  }
});

router.post("/master-barang/create", async (req, res) => {
  const kategoriBarang = await KategoriBarang.findById(req.body.kategoriBarang);
  const satuanBarang = await Satuan.findById(req.body.satuanBarang);
  const addBarang = new Barang({
    ...req.body,
    kategoriBarang: kategoriBarang,
    satuanBarang: satuanBarang,
  });

  try {
    const newBarang = await addBarang.save();
    res.status(201).json({
      message: "Data berhasil ditambahkan",
      data: newBarang,
    });
  } catch (err) {
    res.status(400).json({
      message: "Validasi gagal, data gagal ditambahkan",
      error: err.message,
    });
  }
});

router.put("/master-barang/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { namaBarang } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "ID tidak boleh kosong",
    });
  }

  const existingBarang = await Barang.findOne({
    namaBarang: { $regex: new RegExp(req.body.namaBarang, "i") },
    _id: { $ne: id },
  });
  if (existingBarang) {
    return res.status(400).json({
      message: "Nama barang sudah digunakan",
    });
  }

  const editBarang = await Barang.findById(id)
    .populate("kategoriBarang")
    .populate("satuanBarang");
  if (!editBarang) {
    return res.status(404).json({
      message: "Data tidak ditemukan",
    });
  }

  editBarang.namaBarang = namaBarang;

  try {
    const updatedBarang = await editBarang.save();
    res.status(200).json({
      message: "Data berhasil diubah",
      data: updatedBarang,
    });
  } catch (err) {
    res.status(400).json({
      message: "Validasi gagal, data gagal diubah",
      error: err.message,
    });
  }
});

router.delete("/master-barang/delete/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "ID tidak boleh kosong",
    });
  }

  try {
    await Barang.deleteOne({ _id: id });
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
