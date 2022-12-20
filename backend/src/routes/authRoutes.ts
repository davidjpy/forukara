import express from 'express';
import passport from 'passport';

import authController from '@controllers/authController';
import { loginLimiter } from '@middlewares/requestLimiter';

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
    .get(passport.authenticate('google', { scope: ['profile'] }))

// Oauth callback routes 
router.route('/google/callback')
    .get(passport.authenticate('google', {
        successRedirect: process.env.CLIENT_HOST,
        failureRedirect: process.env.CLIENT_HOST
    }))

export default router;