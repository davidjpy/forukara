import express from 'express';

import commentController from '@controllers/commentController';

const router = express.Router();

router.route('/')
    .get(commentController.getCommentByPost)
    .post(commentController.createComment)
    .patch(commentController.updateComment)
    .delete(commentController.deleteComment)

export default router;

