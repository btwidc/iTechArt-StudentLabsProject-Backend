import sequelize from '../db';
import { DataTypes } from 'sequelize';

import Event from './Event';

const Category = sequelize.define(
  'category',
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
  },
  { timestamps: false },
);

Category.hasMany(Event);

export default Category;
