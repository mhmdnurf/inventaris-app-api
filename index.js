import express from "express";
import mongoose from "mongoose";
import barangEndpoint from "./routes/barang.js";
import bahanEndpoint from "./routes/bahan.js";
import barangMasukEndpoint from "./routes/barangMasuk.js";
import barangKeluarEndpoint from "./routes/barangKeluar.js";
import bahanMasukEndpoint from "./routes/bahanMasuk.js";
import bahanKeluarEndpoint from "./routes/bahanKeluar.js";

const app = express();
const port = 3000;

const mongoURI = "mongodb://127.0.0.1:27017/db_inventaris";

const endpoints = [
  barangEndpoint,
  barangMasukEndpoint,
  barangKeluarEndpoint,
  bahanEndpoint,
  bahanMasukEndpoint,
  bahanKeluarEndpoint,
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
