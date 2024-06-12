import { Sequelize } from "sequelize";
import { dbUser, dbPass, dbHost } from "./config";

const connectionString = `postgres://${dbUser}:${dbPass}@${dbHost}/movies`;
const sequelize = new Sequelize(connectionString);

export default sequelize;
