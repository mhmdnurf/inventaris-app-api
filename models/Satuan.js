import mongoose from "mongoose";

const SatuanSchema = mongoose.Schema(
  {
    kode_satuan: {
      type: String,
      required: true,
    },
    nama_satuan: {
      type: String,
      required: true,
    },
  },
  {
    collection: "master-satuan",
  }
);

const Satuan = mongoose.model("Satuan", SatuanSchema);

export { Satuan };
