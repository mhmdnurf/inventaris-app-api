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
  const { namaBarang, jumlah, satuan } = req.body;

  const existingBarang = await Barang.findOne({
    namaBarang,
  });
  if (existingBarang) {
    return res.status(400).json({
      message: "Nama barang sudah digunakan",
    });
  }

  const addBarang = new Barang({
    namaBarang,
    jumlah,
    satuan,
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
  const { namaBarang, satuan, jumlah } = req.body;

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

  try {
    const updatedBarang = await Barang.findByIdAndUpdate(
      id,
      { namaBarang, satuan, jumlah },
      { new: true }
    );
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
