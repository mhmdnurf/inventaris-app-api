import mongoose from "mongoose";

const KategoriBarangSchema = mongoose.Schema(
  {
    namaKategori: {
      type: String,
      required: true,
    },
    keterangan: {
      type: String,
    },
  },
  {
    collection: "kategori-barang",
  }
);

const KategoriBarang = mongoose.model("KategoriBarang", KategoriBarangSchema);

export { KategoriBarang };
