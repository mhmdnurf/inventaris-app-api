import mongoose from "mongoose";

const SatuanSchema = mongoose.Schema(
  {
    nama_satuan: {
      type: String,
      required: true,
    },
    keterangan: {
      type: String,
    },
  },
  {
    collection: "satuan",
  }
);

const Satuan = mongoose.model("Satuan", SatuanSchema);

export { Satuan };
