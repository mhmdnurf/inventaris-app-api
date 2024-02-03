import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { BarangKeluar } from "../models/BarangKeluar.js";
import { Barang } from "../models/Barang.js";

const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.get("/barang-keluar", async (req, res) => {
  const allBarangKeluar = await BarangKeluar.find();
  try {
    res.status(200).json({
      message: "Berhasil mengambil data",
      data: allBarangKeluar,
    });
  } catch (err) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam mengambil data barang",
      error: err.message,
    });
  }
});

router.post("/barang-keluar/create", async (req, res) => {
  const barang = await Barang.findById(req.body.barang_id);

  if (!barang) {
    return res.status(404).json({
      message: "Barang tidak ditemukan",
    });
  }

  if (barang.jumlah < req.body.jumlahKeluar) {
    return res.status(400).json({
      message: "Jumlah barang tidak mencukupi",
    });
  }

  const addBarangKeluar = new BarangKeluar({
    barang_id: barang._id,
    namaBarang: barang.namaBarang,
    satuan: barang.satuan,
    jumlahKeluar: req.body.jumlahKeluar,
  });

  try {
    const newBarangKeluar = await addBarangKeluar.save();

    // Update the jumlah field of the Barang document
    await Barang.findByIdAndUpdate(barang._id, {
      $inc: { jumlah: -req.body.jumlahKeluar },
    });

    res.status(201).json({
      message: "Data berhasil ditambahkan",
      data: newBarangKeluar,
    });
  } catch (err) {
    res.status(400).json({
      message: "Validasi gagal, data gagal ditambahkan",
      error: err.message,
    });
  }
});

router.delete("/barang-keluar/delete/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "ID tidak boleh kosong",
    });
  }

  const barangKeluar = await BarangKeluar.findById(id);
  if (!barangKeluar) {
    return res.status(404).json({
      message: "Barang keluar not found",
    });
  }

  try {
    // Update the jumlah field of the Barang document
    await Barang.findByIdAndUpdate(barangKeluar.barang_id, {
      $inc: { jumlah: barangKeluar.jumlahKeluar },
    });

    // Delete the BarangKeluar document
    await BarangKeluar.findByIdAndDelete(id);

    res.status(200).json({
      message: "Data berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam menghapus data",
      error: err.message,
    });
  }
});

export default router;
