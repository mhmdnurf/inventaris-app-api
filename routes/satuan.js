import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Satuan } from "../models/Satuan.js";

const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.get("/satuan", async (req, res) => {
  const allSatuan = await Satuan.find();
  try {
    res.status(200).json({
      message: "Berhasil mengambil data",
      data: allSatuan,
    });
  } catch (err) {
    res.status(500).json({
      message: "Terjadi kesalahan server",
      error: err.message,
    });
  }
});

router.post("/satuan/create", async (req, res) => {
  const addSatuan = new Satuan({ ...req.body });
  const existingSatuan = await Satuan.findOne({
    nama_satuan: { $regex: new RegExp(addSatuan.nama_satuan, "i") },
  });
  if (existingSatuan) {
    return res.status(400).json({
      message: "Nama satuan sudah digunakan",
    });
  }

  try {
    const newSatuan = await addSatuan.save();
    res.status(201).json({
      message: "Data berhasil ditambah",
      data: newSatuan,
    });
  } catch (err) {
    res.status(400).json({
      message: "Validasi gagal, data gagal ditambahkan",
      error: err.message,
    });
  }
});

router.put("/satuan/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { namaSatuan, keterangan } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "ID tidak boleh kosong",
    });
  }

  const existingSatuan = await Satuan.findOne({
    namaSatuan: { $regex: new RegExp(req.body.namaSatuan, "i") },
    _id: { $ne: id },
  });
  if (existingSatuan) {
    return res.status(400).json({
      message: "Nama satuan sudah digunakan",
    });
  }

  const editSatuan = await Satuan.findById(id);
  if (!editSatuan) {
    return res.status(404).json({
      message: "Data tidak ditemukan",
    });
  }

  editSatuan.namaSatuan = namaSatuan;
  editSatuan.keterangan = keterangan;

  try {
    const updatedSatuan = await editSatuan.save();
    res.status(200).json({
      message: "Data berhasil diubah",
      data: updatedSatuan,
    });
  } catch (err) {
    res.status(400).json({
      message: "Validasi gagal, data gagal diubah",
      error: err.message,
    });
  }
});

router.delete("/satuan/delete/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "ID tidak boleh kosong",
    });
  }

  try {
    await Satuan.deleteOne({ _id: id });
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
