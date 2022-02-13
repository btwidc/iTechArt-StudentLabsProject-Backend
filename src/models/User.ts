import sequelize from '../db';
import { DataTypes } from 'sequelize';

const User = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            required: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            required: true,
        },
        password: { type: DataTypes.STRING, allowNull: false, required: true },
        role: { type: DataTypes.STRING, defaultValue: 'HR' },
    },
    { timestamps: false },
);

export default User;
