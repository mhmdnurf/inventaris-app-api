import mongoose from "mongoose";

const BarangSchema = mongoose.Schema(
  {
    namaBarang: {
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
    collection: "master-barang",
  }
);

const Barang = mongoose.model("Barang", BarangSchema);

export { Barang };
