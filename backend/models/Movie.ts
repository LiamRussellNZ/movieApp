const { dbUser, dbPass, dbHost } = require("../config.js");

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

export default Movie;
