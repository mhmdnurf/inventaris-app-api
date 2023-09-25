import mongoose from "mongoose";

const KategoriSchema = mongoose.Schema(
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
    collection: "master-kategori",
  }
);

const Kategori = mongoose.model("Kategori", KategoriSchema);

export { Kategori };
