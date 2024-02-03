import mongoose from "mongoose";

const BahanSchema = mongoose.Schema(
  {
    namaBahan: {
      type: String,
      required: true,
      unique: true,
    },
    jumlah: {
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
    collection: "master-bahan",
  }
);

const Bahan = mongoose.model("Bahan", BahanSchema);

export { Bahan };
