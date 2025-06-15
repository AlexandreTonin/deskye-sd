import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';

function generateAccessToken(payload) {
  return jwt.sign(payload, env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

const verifyAccessToken = (token) => {
  return jwt.verify(token, env.JWT_ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.JWT_REFRESH_TOKEN_SECRET);
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
