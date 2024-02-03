import mongoose from "mongoose";

const BarangKeluarSchema = mongoose.Schema(
  {
    namaBarang: {
      type: String,
      required: true,
      unique: true,
    },
    barang_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Barang",
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
    collection: "barang-masuk",
  }
);

const BarangKeluar = mongoose.model("BarangKeluar", BarangKeluarSchema);

export { BarangKeluar };
