const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("inventaris_app", "root", "", {
  host: "localhost",
  dialect: "mariadb",
});

module.exports = sequelize;
