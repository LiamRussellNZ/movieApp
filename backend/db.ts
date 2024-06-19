import { Sequelize } from "sequelize";
//import { dbUser, dbPass, dbHost, dbName } from "./config";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

//const VCAP_SERVICES = JSON.parse(process.env.VCAP_SERVICES || "");
//const { database, username, password, hostname, port } =
//  VCAP_SERVICES["csb-aws-aurora-mysql"][0].credentials;

//if (!VCAP_SERVICES) {
//  console.error("MySQL Database is not available");
//}

const dbName = process.env.DB_NAME || "";
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
