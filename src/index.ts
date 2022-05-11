import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import express from 'express';
import cors from 'cors';

import { Server } from 'socket.io';

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

app.use(
  cors({
    origin:
      'https://i-tech-art-student-labs-project-frontend-m346xuq96.vercel.app/',
  }),
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:
      'https://i-tech-art-student-labs-project-frontend-m346xuq96.vercel.app/',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(fileUpload({}));

app.use('/api', router);
app.use(errorHandlingMiddleware);

const websocketServer = async () => {
  io.on('connection', (socket) => {
    socket.on('join_chat', (data) => {
      socket.join(data);
    });

    socket.on('send_message', (data) => {
      socket.to(data.room).emit('receive_message', data);
    });
  });
};

const start = async () => {
  try {
    await sequelize.authenticate();
    await synchronizeModels();

    await websocketServer();
    await server.listen(port, () => {
      console.error(`App listening on port ${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
