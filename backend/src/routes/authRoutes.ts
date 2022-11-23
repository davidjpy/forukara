import express from 'express';

import authController from '@controllers/authController';
import { loginLimiter } from '@middlewares/requestLimiter';
import { verifyToken } from '@middlewares/verifyToken';

const router = express.Router();

router.route('/login')
    .post(loginLimiter, authController.login)

router.route('/logout')
    .post(authController.logout)

router.route('/refresh')
    .get(authController.refresh)

// router.use(verifyToken);

router.route('/user/:id')
    .get(authController.getUser)

export default router;