import mongoose, { mongo } from "mongoose";

const BahanSchema = mongoose.Schema(
  {
    kodeBahan: {
      type: String,
      required: true,
    },
    namaBahan: {
      type: String,
      required: true,
    },
    kategoriBahan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "KategoriBahan",
      required: true,
    },
    satuan: {
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
