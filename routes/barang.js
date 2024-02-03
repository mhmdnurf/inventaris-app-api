import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Barang } from "../models/Barang.js";
const router = express.Router();
router.use(cors());
router.use(bodyParser.json());
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

router.get("/master-barang", async (req, res) => {
  const allBarang = await Barang.find();
  try {
    res.status(200).json({
      message: "Berhasil mengambil data",
      data: allBarang,
    });
  } catch (err) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam mengambil data barang",
      error: err.message,
    });
  }
});

router.post("/master-barang/create", async (req, res) => {
  const { namaBarang, jumlah, satuan } = req.body;

  const existingBarang = await Barang.findOne({
    namaBarang,
  });
  if (existingBarang) {
    return res.status(400).json({
      message: "Nama barang sudah digunakan",
    });
  }

  const addBarang = new Barang({
    namaBarang,
    jumlah,
    satuan,
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

router.put("/master-barang/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { namaBarang, satuan, jumlah } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "ID tidak boleh kosong",
    });
  }

  const existingBarang = await Barang.findOne({
    namaBarang: { $regex: new RegExp(req.body.namaBarang, "i") },
    _id: { $ne: id },
  });
  if (existingBarang) {
    return res.status(400).json({
      message: "Nama barang sudah digunakan",
    });
  }

  try {
    const updatedBarang = await Barang.findByIdAndUpdate(
      id,
      { namaBarang, satuan, jumlah },
      { new: true }
    );
    res.status(200).json({
      message: "Data berhasil diubah",
      data: updatedBarang,
    });
  } catch (err) {
    res.status(400).json({
      message: "Validasi gagal, data gagal diubah",
      error: err.message,
    });
  }
});

router.delete("/master-barang/delete/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "ID tidak boleh kosong",
    });
  }

  try {
    await Barang.deleteOne({ _id: id });
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

router.get("/master-barang/report", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const allBarang = await Barang.find({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    });

    let rows = "";
    let headerTable = "";
    let counter = 1;
    for (let barang of allBarang) {
      let date = new Date(barang.createdAt);
      let formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;

      let startDateFormat = new Date(startDate).toLocaleDateString("id-ID");
      let endDateFormat = new Date(endDate).toLocaleDateString("id-ID");

      headerTable += `    <tr>
  <td colspan="5" class="text-center font-semibold">Periode Laporan: ${startDateFormat} - ${endDateFormat}</td>
</tr>`;

      rows += `
        <tr class="border">
          <td class="text-center">${counter++}</td>
          <td class="text-center">${barang.namaBarang}</td>
          <td class="text-center">${barang.jumlah}</td>
          <td class="text-center">${barang.satuan}</td>
          <td class="text-center">${formattedDate}</td>
        </tr>
      `;
    }

    let html = fs.readFileSync(
      path.resolve("../html/report-barang.html"),
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
