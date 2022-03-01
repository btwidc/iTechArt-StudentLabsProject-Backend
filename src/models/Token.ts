import sequelize from '../db';
import { DataTypes } from 'sequelize';
import User from './User';

const Token = sequelize.define(
    'token',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            required: true,
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
        },
    },
    { timestamps: false },
);

Token.belongsTo(User);

export default Token;
