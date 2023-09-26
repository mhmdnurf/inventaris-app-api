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
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam mengambil data barang",
      error: error.message,
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

export default router;
