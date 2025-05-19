import 'dotenv/config';

function required(key) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

const env = {
  SERVER_PORT: required('SERVER_PORT'),
  DATABASE_URL: required('DATABASE_URL'),
  JWT_ACCESS_TOKEN_SECRET: required('JWT_ACCESS_TOKEN_SECRET'),
  JWT_REFRESH_TOKEN_SECRET: required('JWT_REFRESH_TOKEN_SECRET'),
};

export { env };
