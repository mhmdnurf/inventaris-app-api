import mongoose from "mongoose";

const BahanSchema = mongoose.Schema(
  {
    kode_bahan: {
      type: String,
      required: true,
    },
    nama_bahan: {
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
    collection: "master-bahan",
  }
);

const Bahan = mongoose.model("Bahan", BahanSchema);

export { Bahan };
