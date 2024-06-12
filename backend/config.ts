import dotenv from "dotenv";

dotenv.config();

const REQUIRED_ENV_VARS: string[] = ["DB_USER", "DB_PASS", "DB_HOST"];

REQUIRED_ENV_VARS.forEach((varName: string) => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable ${varName}`);
  }
});

export const dbUser = process.env.DB_USER;
export const dbPass = process.env.DB_PASS;
export const dbHost = process.env.DB_HOST;
