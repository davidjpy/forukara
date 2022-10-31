import express from 'express';

import userController from '@controllers/userController';

const router = express.Router();

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

router.route('/id/:id')
    .get(userController.getUserById)

router.route('/verifications/:token')
    .get(userController.verifiyUser)

router.route('/verifications/resend')
    .post(userController.resendVerification)

router.route('/test')
    .get(userController.testing)

export default router;