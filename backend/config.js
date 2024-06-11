require('dotenv').config();

const REQUIRED_ENV_VARS = ['DB_USER', 'DB_PASS', 'DB_HOST'];

REQUIRED_ENV_VARS.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable ${varName}`);
  }
});

module.exports = {
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbHost: process.env.DB_HOST,
};