import { Sequelize } from "sequelize";
//import { dbUser, dbPass, dbHost, dbName } from "./config";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const VCAP_SERVICES = JSON.parse(process.env.VCAP_SERVICES || "")
const { database, username, password, hostname, port } = VCAP_SERVICES["csb-aws-aurora-mysql"][0].credentials

if (!VCAP_SERVICES) {
  console.error("MySQL Database is not available")
}

// const dbName = process.env.DB_NAME || "movies";
// const dbUser = process.env.DB_USER || "root";
// const dbPass = process.env.DB_PASS || "123qweasd!A";
// const dbHost = process.env.DB_HOST || "localhost";
// const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3307; // FIXME

const sequelize = new Sequelize(database, username, password, {
  host: hostname,
  port: port,
  dialect: "mysql",
});

export default sequelize;
