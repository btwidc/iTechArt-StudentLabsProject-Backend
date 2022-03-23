import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
const cloudinary = require('cloudinary').v2;

import router from './routes/index';
import sequelize from './db';
import errorHandlingMiddleware from './middleware/errorHandlingMiddleware';
import synchronizeModels from './models/synchronizeModels';

const port = process.env.PORT || 4000;

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));

app.use('/api', router);
app.use(errorHandlingMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await synchronizeModels();
    await app.listen(port, () => {
      console.error(`App listening on port ${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
