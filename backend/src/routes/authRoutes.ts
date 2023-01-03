import express from 'express';

import authController from '@controllers/authController';
import { loginLimiter } from '@middlewares/requestLimiter';

const router = express.Router();

// Local auth system
router.route('/login')
    // .post(loginLimiter, authController.login)
    .post(authController.login)

router.route('/logout')
    .post(authController.logout)

router.route('/refresh')
    .get(authController.refresh)

// OAuth routes 
router.route('/google')
    .get(authController.googleOAuth)

router.route('/linkedin')
    .get(authController.linkedinOAuth)

export default router;  