import "dotenv/config";

function required(key) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

const env = {
  SERVER_PORT: required("SERVER_PORT"),
};

export { env };
