require("dotenv").config();

const dbUser = process.env.DB_USER || "";
const dbPass = process.env.DB_PASS || "";
const dbHost = process.env.DB_HOST || "";

const connectionString = `postgres://${dbUser}:${dbPass}@${dbHost}/movies`;

const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(connectionString);

class Movie extends Model {}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "movies",
    timestamps: false,
  }
);

module.exports = Movie;
