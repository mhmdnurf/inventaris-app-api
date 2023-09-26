import mongoose from "mongoose";

const StokBahanSchema = mongoose.Schema(
  {
    jumlahStokBahan: {
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

const StokBahan = mongoose.model("StokBahan", StokBahanSchema);

export { StokBahan };
