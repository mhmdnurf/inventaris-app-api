import mongoose from "mongoose";

const KategoriBahanSchema = mongoose.Schema(
  {
    namaKategori: {
      type: String,
      required: true,
    },
    keterangan: {
      type: String,
    },
  },
  {
    collection: "kategori-bahan",
  }
);

const KategoriBahan = mongoose.model("KategoriBahan", KategoriBahanSchema);

export { KategoriBahan };
