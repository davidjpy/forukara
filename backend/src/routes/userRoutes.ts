import express from 'express';

import userController from '@controllers/userController';
import { emailLimiter } from '@middlewares/requestLimiter';
import { verifyToken } from '@middlewares/verifyToken';
import { upload } from '@middlewares/uploadImage';

const router = express.Router();

router.route('/verifications/:token')
    .get(userController.verifiyUser)

router.route('/verifications/resend')
    .post(emailLimiter, userController.resendVerification)

router.route('/')
    .post(userController.createUser)

// router.use(verifyToken);

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
    .patch(upload.single('avatar'), userController.updateUser)
    .delete(userController.deleteUser)

router.route('/:id')
    .get(userController.getUserById)


router.route('/test')
    .get(userController.testing)

export default router;