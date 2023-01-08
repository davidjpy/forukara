import express from 'express';

import userController from '@controllers/userController';
import { emailLimiter } from '@middlewares/requestLimiter';
import { verifyToken } from '@middlewares/verifyToken';
import { upload } from '@middlewares/uploadImage';

const router = express.Router();
const accountRouter = express.Router({ mergeParams: true });

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
router.use('/account/:id', accountRouter)

accountRouter.route('/')
    .get(verifyToken, userController.getAccountById)

accountRouter.route('/info')
    .patch(verifyToken, upload.fields([{ name: 'avatarFile', maxCount: 1 }, { name: 'backgroundFile', maxCount: 1 }]), userController.updateAccountInfoById)

accountRouter.route('/bio')
    .patch(verifyToken, userController.updateAccountBioById)

router.route('/test')
    .get(userController.testing)

export default router;