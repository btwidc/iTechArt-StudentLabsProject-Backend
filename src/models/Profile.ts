import sequelize from '../db';
import { DataTypes } from 'sequelize';

const Profile = sequelize.define(
    'profile',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            required: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            required: true,
        },
        skype: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            required: true,
        },
        ageExperience: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: true,
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
        },
        summary: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
        },
    },
    { timestamps: false },
);

export default Profile;
