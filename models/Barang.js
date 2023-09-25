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
    kategori_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "KategoriBarang",
      required: true,
    },
    satuan_id: {
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
