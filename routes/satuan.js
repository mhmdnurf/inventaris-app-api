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
      message: "Berhasil mengambil data satuan",
      data: allSatuan,
    });
  } catch (err) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam mengambil data satuan",
      error: err.message,
    });
  }
});

export default router;
