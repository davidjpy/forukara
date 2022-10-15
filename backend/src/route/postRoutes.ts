import express from 'express';

import postContoller from '@controller/postController';

const router = express.Router();

router.route('/')
    .get(postContoller.getAllPosts)
    .post(postContoller.createPost)
    .patch(postContoller.updatePost)
    .delete(postContoller.deletePost)

export default router;