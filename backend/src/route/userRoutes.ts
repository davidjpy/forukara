import express from 'express';

import userController from '@controller/userController';

const router = express.Router();

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

router.route('/verifications/:token')
    .post(userController.verifiyUser)

export default router;