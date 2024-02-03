import mongoose from "mongoose";

const BarangMasukSchema = mongoose.Schema(
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
    collection: "barang-masuk",
  }
);

const BarangMasuk = mongoose.model("BarangMasuk", BarangMasukSchema);

export { BarangMasuk };
