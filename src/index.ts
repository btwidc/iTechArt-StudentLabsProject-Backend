import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from './routes/index';
import sequelize from './db';
import errorHandlingMiddleware from './middleware/errorHandlingMiddleware';
import User from './models/User';
import Token from './models/Token';
import Profile from './models/Profile';
const port = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);
app.use(errorHandlingMiddleware);

const start = async () => {
    try {
        await sequelize.authenticate();
        await User.sync();
        await Token.sync();
        await Profile.sync();
        app.listen(port, () => {
            console.error(`App listening on port ${port}`);
        });
    } catch (e) {
        console.error(e);
    }
};

start();
