import { Sequelize } from "sequelize";
//import { dbUser, dbPass, dbHost, dbName } from "./config";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME || "default";
const dbUser = process.env.DB_USER || "";
const dbPass = process.env.DB_PASS || "";
const dbHost = process.env.DB_HOST || "";
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: "mysql",
});

export default sequelize;
