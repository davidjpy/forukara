import express from 'express';

import authController from '@controllers/authController';
import verifyToken from '@middlewares/verifyToken';

const router = express.Router();

router.route('/login')
    .post(authController.login)

router.route('/logout')
    .post(authController.logout)

router.route('/refresh')
    .get(authController.refresh)

export default router;