import mongoose from "mongoose";

const StokBarangSchema = mongoose.Schema(
  {
    jumlahStokBarang: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    editedAt: {
      type: Date,
    },
  },
  {
    collection: "stok-bahan",
  }
);

const StokBarang = mongoose.model("StokBarang", StokBarangSchema);

export { StokBarang };
