import express from "express";
import mongoose from "mongoose";
import barangEndpoint from "./routes/barang.js";
import bahanEndpoint from "./routes/bahan.js";
import kategoriBahanEndpoint from "./routes/kategori-bahan.js";
import kategoriBarangEndpoint from "./routes/kategori-barang.js";
import satuanEndpoint from "./routes/satuan.js";
import stokBarangEndpoint from "./routes/stok-barang.js";
import stokBahanEndpoint from "./routes/stok-bahan.js";

const app = express();
const port = 3000;

const mongoURI = "mongodb://127.0.0.1:27017/db_inventaris";

const endpoints = [
  barangEndpoint,
  bahanEndpoint,
  kategoriBahanEndpoint,
  kategoriBarangEndpoint,
  satuanEndpoint,
  stokBarangEndpoint,
  stokBahanEndpoint,
];

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongoose");
  })
  .catch((err) => {
    console.log({
      message: "Failed to connect to Mongoose",
      error: err.message,
    });
  });

endpoints.map((endpoint) => {
  app.use("/api", endpoint);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
