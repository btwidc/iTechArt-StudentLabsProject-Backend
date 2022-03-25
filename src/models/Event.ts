import sequelize from '../db';
import { DataTypes } from 'sequelize';

const Event = sequelize.define(
  'event',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      required: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      required: true,
    },
  },
  { timestamps: false },
);

export default Event;
