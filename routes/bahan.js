import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Bahan } from "../models/Bahan.js";
const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.get("/master-bahan", async (req, res) => {
  const allBahan = await Bahan.find();
  try {
    res.status(200).json({
      message: "Berhasil mengambil data",
      data: allBahan,
    });
  } catch (err) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam mengambil data bahan",
      error: err.message,
    });
  }
});

router.post("/master-bahan/create", async (req, res) => {
  const { namaBahan, jumlah, satuan } = req.body;

  const existingBahan = await Bahan.findOne({
    namaBahan,
  });
  if (existingBahan) {
    return res.status(400).json({
      message: "Nama bahan sudah digunakan",
    });
  }

  const addbahan = new Bahan({
    namaBahan,
    jumlah,
    satuan,
  });

  try {
    const newbahan = await addbahan.save();
    res.status(201).json({
      message: "Data berhasil ditambahkan",
      data: newbahan,
    });
  } catch (err) {
    res.status(400).json({
      message: "Validasi gagal, data gagal ditambahkan",
      error: err.message,
    });
  }
});

router.put("/master-bahan/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { namaBahan, satuan, jumlah } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "ID tidak boleh kosong",
    });
  }

  const existingBahan = await Bahan.findOne({
    namaBahan: { $regex: new RegExp(req.body.namaBahan, "i") },
    _id: { $ne: id },
  });
  if (existingBahan) {
    return res.status(400).json({
      message: "Nama bahan sudah digunakan",
    });
  }

  try {
    const updatedbahan = await Bahan.findByIdAndUpdate(
      id,
      { namaBahan, satuan, jumlah },
      { new: true }
    );
    res.status(200).json({
      message: "Data berhasil diubah",
      data: updatedbahan,
    });
  } catch (err) {
    res.status(400).json({
      message: "Validasi gagal, data gagal diubah",
      error: err.message,
    });
  }
});

router.delete("/master-bahan/delete/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "ID tidak boleh kosong",
    });
  }

  try {
    await Bahan.deleteOne({ _id: id });
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
