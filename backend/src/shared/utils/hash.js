import bcrypt from 'bcryptjs';

async function hashPassword(password) {
  return bcrypt.hashSync(password, 12);
}

async function checkPasswordHash(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

export { hashPassword, checkPasswordHash };
