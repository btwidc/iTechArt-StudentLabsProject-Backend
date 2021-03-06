import sequelize from '../db';
import { DataTypes } from 'sequelize';

import Event from './Event';

const Candidate = sequelize.define(
  'candidate',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      required: true,
    },
    education: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    technology: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    cvLink: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false },
);

Candidate.hasMany(Event);
Event.belongsTo(Candidate);

export default Candidate;
