import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { BarangMasuk } from "../models/BarangMasuk.js";
import { Barang } from "../models/Barang.js";

const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.get("/barang-masuk", async (req, res) => {
  const allBarangMasuk = await BarangMasuk.find();
  try {
    res.status(200).json({
      message: "Berhasil mengambil data",
      data: allBarangMasuk,
    });
  } catch (err) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam mengambil data barang",
      error: err.message,
    });
  }
});

router.post("/barang-masuk/create", async (req, res) => {
  const barang = await Barang.findById(req.body.barang_id);

  if (!barang) {
    return res.status(404).json({
      message: "Barang not found",
    });
  }

  const addBarangMasuk = new BarangMasuk({
    barang_id: barang._id,
    namaBarang: barang.namaBarang,
    satuan: barang.satuan,
    jumlahMasuk: req.body.jumlahMasuk,
  });

  try {
    const newBarangMasuk = await addBarangMasuk.save();

    // Update the jumlah field of the Barang document
    await Barang.findByIdAndUpdate(barang._id, {
      $inc: { jumlah: req.body.jumlahMasuk },
    });

    res.status(201).json({
      message: "Data berhasil ditambahkan",
      data: newBarangMasuk,
    });
  } catch (err) {
    res.status(400).json({
      message: "Validasi gagal, data gagal ditambahkan",
      error: err.message,
    });
  }
});

router.delete("/barang-masuk/delete/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "ID tidak boleh kosong",
    });
  }

  const barangMasuk = await BarangMasuk.findById(id);
  if (!barangMasuk) {
    return res.status(404).json({
      message: "Barang masuk not found",
    });
  }

  try {
    // Update the jumlah field of the Barang document
    await Barang.findByIdAndUpdate(barangMasuk.barang_id, {
      $inc: { jumlah: -barangMasuk.jumlahMasuk },
    });

    // Delete the BarangMasuk document
    await BarangMasuk.findByIdAndDelete(id);

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
