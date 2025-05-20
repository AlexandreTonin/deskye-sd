import bcrypt from 'bcryptjs';

async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

async function checkPasswordHash(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

export { checkPasswordHash, hashPassword };
