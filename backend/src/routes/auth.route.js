import express from 'express';
import authController from '../controller/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.middleware.js'

const router = express.Router();

router.get("/check-auth", verifyToken, authController.checkAuth)

router.post('/signup', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/verify-email', authController.verifyEmail);
router.post('/forgot-password', authController.forgotPassword)

router.post('/reset-password/:token', authController.resetPassword)

export default router;