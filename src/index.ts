require("dotenv").config();
import express from "express";
import cors from "cors";
import router from "./routes/index";
const sequelize = require("./db");
const models = require("./models/models");
const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
