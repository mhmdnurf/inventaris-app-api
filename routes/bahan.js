import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Bahan } from "../models/Bahan.js";
const router = express.Router();
router.use(cors());
router.use(bodyParser.json());
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

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

router.get("/master-bahan/report", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const allBahan = await Bahan.find({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    });

    let rows = "";
    let headerTable = "";
    let counter = 1;
    let startDateFormat = new Date(startDate).toLocaleDateString("id-ID");
    let endDateFormat = new Date(endDate).toLocaleDateString("id-ID");
    headerTable += `    <tr>
    <td colspan="5" class="text-center font-semibold">Periode Laporan: ${startDateFormat} - ${endDateFormat}</td>
  </tr>`;
    for (let bahan of allBahan) {
      let date = new Date(bahan.createdAt);
      let formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      rows += `
        <tr class="border">
          <td class="text-center">${counter++}</td>
          <td class="text-center">${bahan.namaBahan}</td>
          <td class="text-center">${bahan.jumlah}</td>
          <td class="text-center">${bahan.satuan}</td>
          <td class="text-center">${formattedDate}</td>
        </tr>
      `;
    }

    let html = fs.readFileSync(
      path.resolve("./html/report-bahan.html"),
      "utf8"
    );
    html = html.replace("{{rows}}", rows);
    html = html.replace("{{headerTable}}", headerTable);

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({ format: "A4" });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
    });
    res.send(pdf);

    await browser.close();
  } catch (err) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam membuat laporan",
      error: err.message,
    });
  }
});

export default router;
