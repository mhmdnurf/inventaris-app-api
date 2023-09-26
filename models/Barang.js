import mongoose from "mongoose";

const BarangSchema = mongoose.Schema(
  {
    namaBarang: {
      type: String,
      required: true,
    },
    kategoriBarang: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "KategoriBarang",
      required: true,
    },
    satuanBarang: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Satuan",
      required: true,
    },
  },
  {
    collection: "master-barang",
  }
);

const Barang = mongoose.model("Barang", BarangSchema);

export { Barang };
