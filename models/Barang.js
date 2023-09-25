import mongoose from "mongoose";

const BarangSchema = mongoose.Schema(
  {
    kode_barang: {
      type: String,
      required: true,
    },
    nama_barang: {
      type: String,
      required: true,
    },
    kategori: {
      type: String,
      required: true,
    },
    satuan: {
      type: String,
      required: true,
    },
  },
  {
    collection: "master-barang",
  }
);

const Barang = mongoose.model("Barang", BarangSchema);

export { Barang };
