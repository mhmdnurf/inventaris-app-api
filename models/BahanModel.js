const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/db_migration");

const BahanModel = sequelize.define(
  "BahanModel",
  {
    kode_bahan: {
      type: DataTypes.STRING,
    },
    nama_bahan: {
      type: DataTypes.STRING,
    },
    harga: {
      type: DataTypes.DOUBLE,
    },
    satuan: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "tb_bahan" }
);

module.exports = BahanModel;
