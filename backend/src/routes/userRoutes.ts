import express from 'express';

import userController from '@controllers/userController';
import { emailLimiter } from '@middlewares/requestLimiter';
import { verifyToken } from '@middlewares/verifyToken';
import { upload } from '@middlewares/uploadImage';

const router = express.Router();

// Verifiy new user
router.route('/verifications/:token')
    .get(userController.verifiyUser)

// Obtain another verification email
router.route('/verifications/resend')
    .post(emailLimiter, userController.resendVerification)

// CRUD operations for public user 
router.route('/:username')
    .get(userController.getUserByUsername)

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
    .delete(userController.deleteUser)

// CRUD operations for private account
router.route('/account/:id')
    .get(verifyToken, userController.getAccountById)
    .patch(verifyToken, upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'background', maxCount: 1 }]), userController.updateAccountById)


router.route('/test')
    .get(userController.testing)

export default router;