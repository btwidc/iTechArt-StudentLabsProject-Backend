const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
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
    role: { type: DataTypes.STRING, defaultValue: "HR" },
  },
  { timestamps: false }
);

const Token = sequelize.define(
  "token",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      required: true,
    },
    refreshToken: { type: DataTypes.STRING, allowNull: false, required: true },
  },
  { timestamps: false }
);

User.hasOne(Token);
Token.belongsTo(User);

module.exports = { User, Token };
