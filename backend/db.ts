import dynamoose from "dynamoose";
//import { dbUser, dbPass, dbHost, dbName } from "./config";
import dotenv from "dotenv";
import process from "process";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { fromEnv } from "@aws-sdk/credential-provider-env";

dotenv.config();

const VCAP_SERVICES = JSON.parse(process.env.VCAP_SERVICES || "");
const { region, access_key_id, secret_access_key } =
  VCAP_SERVICES["csb-aws-dynamodb-table"][0].credentials;

if (!VCAP_SERVICES) {
  console.error("DynamoDB service is not available");
}

if (!region || !access_key_id || !secret_access_key) {
  throw new Error(
    "Missing required environment variables for DynamoDB configuration"
  );
}

// const dbName = process.env.DB_NAME || "";
// const dbUser = process.env.DB_USER || "";
// const dbPass = process.env.DB_PASS || "";
// const dbHost = process.env.DB_HOST || "";
// const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 8000;

// const dynamoDBClient = new DynamoDBClient({
//   region: region,
//   credentials: fromEnv(),
// });

// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB({
  credentials: {
    accessKeyId: access_key_id,
    secretAccessKey: secret_access_key,
  },
  region: region,
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

//const dynamoDB = DynamoDBDocumentClient.from(dynamoDBClient);

// Set Dynamoose AWS SDK instance
// dynamoose.aws.sdk.config.update({
//   region: REGION,
//   accessKeyId: ACCESS_KEY_ID,
//   secretAccessKey: SECRET_ACCESS_KEY,
// });

//dynamoose.aws.ddb.local("http://localhost:8000");

export default dynamoose;
