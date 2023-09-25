import mongoose from "mongoose";

const KategoriBarangSchema = mongoose.Schema(
  {
    kode_kategori: {
      type: String,
      required: true,
    },
    nama_kategori: {
      type: String,
      required: true,
    },
  },
  {
    collection: "kategori-barang",
  }
);

const KategoriBarang = mongoose.model("KategoriBarang", KategoriBarangSchema);

export { KategoriBarang };
