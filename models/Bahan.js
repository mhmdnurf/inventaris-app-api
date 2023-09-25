import mongoose, { mongo } from "mongoose";

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
    kategori_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "KategoriBahan",
      required: true,
    },
    satuan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Satuan",
      required: true,
    },
  },
  {
    collection: "master-bahan",
  }
);

const Bahan = mongoose.model("Bahan", BahanSchema);

export { Bahan };
