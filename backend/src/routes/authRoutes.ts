import express from 'express';
import passport from 'passport';
import jwt, { Secret } from 'jsonwebtoken';

import authController from '@controllers/authController';
import { loginLimiter } from '@middlewares/requestLimiter';
import { IToken, IUser } from '@utilities/types';

const router = express.Router();

router.route('/login')
    .post(authController.login)
// .post(loginLimiter, authController.login)

router.route('/logout')
    .post(authController.logout)

router.route('/refresh')
    .get(authController.refresh)

// Oauth routes 
router.route('/google')
    .get(passport.authenticate('google', { scope: ['email', 'profile'], session: false }))

// Oauth callback routes 
router.route('/google/callback')
    .get(passport.authenticate('google', { session: false }), authController.googleOauth)


export default router;  