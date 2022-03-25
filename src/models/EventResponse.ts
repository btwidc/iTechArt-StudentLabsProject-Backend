import sequelize from '../db';
import { DataTypes } from 'sequelize';

import Event from './Event';

const EventResponse = sequelize.define(
  'eventResponse',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      required: true,
    },
    responseContent: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
  },
  { timestamps: false },
);

EventResponse.hasMany(Event);

export default EventResponse;
