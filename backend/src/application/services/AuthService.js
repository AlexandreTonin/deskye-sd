import { AuthRepository } from '../../domain/repositories/AuthRepository.js';
import { UserRepository } from '../../domain/repositories/UserRepository.js';
import { UnauthorizedError } from '../../shared/errors/UnauthorizedError.js';
import { checkPasswordHash } from '../../shared/utils/hash.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../shared/utils/jwt.js';

class AuthService {
  constructor() {
    this.authRepository = new AuthRepository();
    this.userRepository = new UserRepository();
  }

  async login(loginDTO) {
    const user = await this.userRepository.findByEmailWithPassword(
      loginDTO.email,
    );

    if (user.length == 0) {
      throw new UnauthorizedError('Invalid email/password');
    }

    const passwordMatch = await checkPasswordHash(
      loginDTO.password,
      user[0].hashedPassword,
    );

    if (!passwordMatch) {
      throw new UnauthorizedError('Invalid email/password');
    }

    const jwtUserPaylod = {
      id: user[0].id,
      email: user[0].email,
      role: user[0].role,
    };

    const accessToken = generateAccessToken(jwtUserPaylod);
    const refreshToken = generateRefreshToken(jwtUserPaylod);

    await this.authRepository.login(user[0].id);

    return { accessToken, refreshToken };
  }

  async register(registerDTO) {}

  async resetPassword(resetPasswordDTO) {}

  async confirmEmail(confirmEmailDTO) {}

  async refresh(confirmEmailDTO) {}
}

export { AuthService };
