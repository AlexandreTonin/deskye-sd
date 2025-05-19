import { response } from 'express';
import { LoginDTO } from '../../application/dtos/auth/LoginDTO.js';
import { AuthService } from '../../application/services/AuthService.js';
import {
  errorResponse,
  successResponse,
} from '../../shared/utils/httpResponse.js';
import { loginSchema } from '../validators/authValidator.js';

const authService = new AuthService();

const AuthController = {
  async login(req, res) {
    try {
      const validatedData = loginSchema.parse(req.body);

      const loginDTO = new LoginDTO(validatedData);

      const { accessToken, refreshToken } = await authService.login(loginDTO);

      res.cookie('deskye_access_token', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 240, // 240 minutes
      });

      res.cookie('deskye_refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 240, // 240 minutes
      });

      successResponse(res, 'Logged in successfully', 200);
    } catch (error) {
      errorResponse(
        res,
        'Login failed',
        error.message,
        error.statusCode || 500,
        error,
      );
    }
  },
  async register(req, res) {},
  async resetPassword(req, res) {},
  async confirmEmail(req, res) {},
  async refresh(req, res) {},
};

export { AuthController };
