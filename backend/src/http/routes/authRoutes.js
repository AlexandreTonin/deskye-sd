import express from 'express';
import { AuthController } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/refresh', AuthController.refresh);
router.post('/reset-password', AuthController.resetPassword);
router.post('/confirm-email', AuthController.confirmEmail);

export { router as authRoutes };
