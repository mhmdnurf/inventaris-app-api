import mongoose from "mongoose";

const BahanMasukSchema = mongoose.Schema(
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
    jumlahMasuk: {
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
    collection: "bahan-masuk",
  }
);

const BahanMasuk = mongoose.model("BahanMasuk", BahanMasukSchema);

export { BahanMasuk };
