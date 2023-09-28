import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Bahan } from "../models/Bahan.js";
import { KategoriBahan } from "../models/KategoriBahan.js";
import { Satuan } from "../models/Satuan.js";

const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.get("/master-bahan", async (req, res) => {
  const allBahan = await Bahan.find()
    .populate("kategoriBahan")
    .populate("satuanBahan");
  try {
    res.status(200).json({
      message: "Berhasil mengambil data",
      allBahan,
    });
  } catch (err) {
    res.status(500).json({
      message: "Terjadi kesalahan server",
      error: err.message,
    });
  }
});

router.post("/master-bahan/create", async (req, res) => {
  const kategoriBahan = await KategoriBahan.findById(req.body.kategoriBahan);
  const satuanBahan = await Satuan.findById(req.body.satuanBahan);
  const addBahan = new Bahan({
    ...req.body,
    kategoriBahan: kategoriBahan,
    satuanBahan: satuanBahan,
  });

  try {
    const newBahan = await addBahan.save();
    res.status(201).json({
      message: "Data berhasil ditambahkan",
      data: newBahan,
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
  const { namaBahan } = req.body;

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

  const editBahan = await Bahan.findById(id)
    .populate("kategoriBahan")
    .populate("satuanBahan");
  if (!editBahan) {
    return res.status(404).json({
      message: "Data tidak ditemukan",
    });
  }

  editBahan.namaBahan = namaBahan;

  try {
    const updatedBahan = await editBahan.save();
    res.status(200).json({
      message: "Data berhasil diubah",
      data: updatedBahan,
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
