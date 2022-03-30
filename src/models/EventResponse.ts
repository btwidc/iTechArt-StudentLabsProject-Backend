import sequelize from '../db';
import { DataTypes } from 'sequelize';

import Event from './Event';
import User from './User';

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
      required: true,
    },
  },
  { timestamps: false },
);

EventResponse.hasMany(Event);
Event.belongsTo(EventResponse);
EventResponse.belongsTo(User);

export default EventResponse;
