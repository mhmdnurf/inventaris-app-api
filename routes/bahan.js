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
      message: "Berhasil mengambil data bahan",
      data: allBahan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data bahan",
      error: error.message,
    });
  }
});

export default router;
