import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const getEnvVariable = name => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} environmental variable is not defined`);
  }
  return value;
};

const port = getEnvVariable('PORT');
const allowedOrigin = getEnvVariable('ALLOWED_ORIGIN');
const apiKey = getEnvVariable('API_KEY');
const prodHost = getEnvVariable('PROD_HOST');

export {
    port,
    allowedOrigin,
    apiKey,
    prodHost
  };