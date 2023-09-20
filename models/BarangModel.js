const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/db_migration");

const BarangModel = sequelize.define(
  "BarangModel",
  {
    kode_barang: {
      type: DataTypes.STRING,
    },
    nama_barang: {
      type: DataTypes.STRING,
    },
    harga: {
      type: DataTypes.DOUBLE,
    },
    satuan: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "tb_barang" }
);

module.exports = BarangModel;
