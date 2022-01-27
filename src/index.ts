require("dotenv").config();
import express from "express";

const app = express();
const port = process.env.PORT || 4000;
const sequelize = require("./db");
const models = require("./models/models");

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
    app.get("/", (req, res) => {
      res.send("Started!");
    });
  } catch (e) {
    console.log(e);
  }
};

start();
