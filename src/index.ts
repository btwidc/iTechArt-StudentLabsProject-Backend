require("dotenv").config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index";
const errorHandlingMiddleware = require("./middleware/errorHandlingMiddleware");
const sequelize = require("./db");
const port = process.env.PORT || 4000;

const app = express();
app.use(cors({ credentials: true, origin: process.env.WEB_CLIENT_URL }));
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use(errorHandlingMiddleware);

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
