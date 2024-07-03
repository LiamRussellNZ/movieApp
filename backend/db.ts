import dynamoose from "dynamoose";
import dotenv from "dotenv";
import process from "process";

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

// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB({
  credentials: {
    accessKeyId: access_key_id,
    secretAccessKey: secret_access_key,
  },
  region: region,
});

dynamoose.aws.ddb.set(ddb);

export default dynamoose;
