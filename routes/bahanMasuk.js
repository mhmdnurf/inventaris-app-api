import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { BahanKeluar } from "../models/BahanKeluar.js";
import { Bahan } from "../models/Bahan.js";

const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.get("/bahan-masuk", async (req, res) => {
  const allBahanMasuk = await BahanKeluar.find();
  try {
    res.status(200).json({
      message: "Berhasil mengambil data",
      data: allBahanMasuk,
    });
  } catch (err) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam mengambil data bahan",
      error: err.message,
    });
  }
});

router.post("/bahan-masuk/create", async (req, res) => {
  const bahan = await Bahan.findById(req.body.bahan_id);

  if (!bahan) {
    return res.status(404).json({
      message: "Bahan not found",
    });
  }

  const addBahanMasuk = new BahanKeluar({
    bahan_id: bahan._id,
    namaBahan: bahan.namaBahan,
    satuan: bahan.satuan,
    jumlahMasuk: req.body.jumlahMasuk,
  });

  try {
    const newBahanMasuk = await addBahanMasuk.save();

    // Update the jumlah field of the Bahan document
    await Bahan.findByIdAndUpdate(bahan._id, {
      $inc: { jumlah: req.body.jumlahMasuk },
    });

    res.status(201).json({
      message: "Data berhasil ditambahkan",
      data: newBahanMasuk,
    });
  } catch (err) {
    res.status(400).json({
      message: "Validasi gagal, data gagal ditambahkan",
      error: err.message,
    });
  }
});

router.delete("/bahan-masuk/delete/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "ID tidak boleh kosong",
    });
  }

  const bahanMasuk = await BahanKeluar.findById(id);
  if (!bahanMasuk) {
    return res.status(404).json({
      message: "Bahan masuk not found",
    });
  }

  try {
    // Update the jumlah field of the Bahan document
    await Bahan.findByIdAndUpdate(bahanMasuk.bahan_id, {
      $inc: { jumlah: -bahanMasuk.jumlahMasuk },
    });

    // Delete the BahanKeluar document
    await BahanKeluar.findByIdAndDelete(id);

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
