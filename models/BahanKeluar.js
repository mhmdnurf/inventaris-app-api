import mongoose from "mongoose";

const BahanKeluarSchema = mongoose.Schema(
  {
    namaBahan: {
      type: String,
      required: true,
      unique: true,
    },
    bahan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bahan",
      required: true,
    },
    jumlahKeluar: {
      type: Number,
      required: true,
    },
    satuan: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "bahan-keluar",
  }
);

const BahanKeluar = mongoose.model("BahanKeluar", BahanKeluarSchema);

export { BahanKeluar };
