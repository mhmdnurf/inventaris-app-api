const express = require("express");
const cors = require("cors");
const port = 3001;
const sequelize = require("./database/db_migration");
const barangEndpoint = require("./routes/barang");
const bahanEndpoint = require("./routes/bahan");

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize connected to database");
  })
  .catch((err) => {
    console.log("Sequelize failed to connect to database:", err);
  });
sequelize.sync().then(() => {
  console.log("Database is ready!");
});

const app = express();
app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());

app.use("/master-barang", barangEndpoint);
app.use("/master-bahan", bahanEndpoint);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
