const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

const mongoURI = "mongodb://127.0.0.1:27017/db_inventaris";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongoose");
  })
  .catch((err) => {
    console.log("Failed to connect to Mongoose");
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
