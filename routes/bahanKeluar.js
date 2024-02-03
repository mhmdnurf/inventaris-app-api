import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { BahanKeluar } from "../models/BahanKeluar.js";
import { Bahan } from "../models/Bahan.js";
import csv from "fast-csv";
import fs from "fs";

const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.get("/bahan-keluar", async (req, res) => {
  const allBahanKeluar = await BahanKeluar.find();
  try {
    res.status(200).json({
      message: "Berhasil mengambil data",
      data: allBahanKeluar,
    });
  } catch (err) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam mengambil data bahan",
      error: err.message,
    });
  }
});

router.post("/bahan-keluar/create", async (req, res) => {
  const bahan = await Bahan.findById(req.body.bahan_id);

  if (!bahan) {
    return res.status(404).json({
      message: "Bahan tidak ditemukan",
    });
  }

  if (bahan.jumlah < req.body.jumlahKeluar) {
    return res.status(400).json({
      message: "Jumlah bahan tidak mencukupi",
    });
  }

  const addBahanKeluar = new BahanKeluar({
    bahan_id: bahan._id,
    namaBahan: bahan.namaBahan,
    satuan: bahan.satuan,
    jumlahKeluar: req.body.jumlahKeluar,
  });

  try {
    const newBahanKeluar = await addBahanKeluar.save();

    // Update the jumlah field of the Bahan document
    await Bahan.findByIdAndUpdate(bahan._id, {
      $inc: { jumlah: -req.body.jumlahKeluar },
    });

    res.status(201).json({
      message: "Data berhasil ditambahkan",
      data: newBahanKeluar,
    });
  } catch (err) {
    res.status(400).json({
      message: "Validasi gagal, data gagal ditambahkan",
      error: err.message,
    });
  }
});

router.delete("/bahan-keluar/delete/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "ID tidak boleh kosong",
    });
  }

  const bahanKeluar = await BahanKeluar.findById(id);
  if (!bahanKeluar) {
    return res.status(404).json({
      message: "Bahan keluar not found",
    });
  }

  try {
    // Update the jumlah field of the Bahan document
    await Bahan.findByIdAndUpdate(bahanKeluar.bahan_id, {
      $inc: { jumlah: bahanKeluar.jumlahKeluar },
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

router.get("/bahan-keluar/report", async (req, res) => {
  try {
    const allBahanKeluar = await BahanKeluar.find();

    const csvStream = csv.format({ headers: true });
    const writableStream = fs.createWriteStream("BahanKeluarReport.csv");

    writableStream.on("finish", function () {
      res.download("BahanKeluarReport.csv");
    });

    csvStream.pipe(writableStream);
    allBahanKeluar.forEach(function (item) {
      csvStream.write(item);
    });

    csvStream.end();
  } catch (err) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam membuat laporan",
      error: err.message,
    });
  }
});

export default router;
