import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

import Comment from '@models/Comment';

const getCommentByPost = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { post } = req.body;

    if (!post) {
        return res.status(400).json({ message: 'Post ID required' });
    }

    const comment = await Comment.find({ post: post }).lean();

    if (!comment?.length) {
        return res.status(400).json({ message: 'No comments found' });
    }

    res.json(comment);
});

const createComment = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { post, user, content } = req.body;

    if (!post || !user || !content) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const commentObj = { post, user, content }
    const comment = await Comment.create(commentObj);

    if (comment) {
        res.status(201).json({ message: 'Comment created' });
    } else {
        res.status(400).json({ message: 'Invalid comment data received' });
    }
});

const updateComment = asyncHandler(async (req: Request, res:Response): Promise<any> => {
    const { id, content } = req.body;

    if (!id || !content) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const comment = await Comment.findById(id).exec();

    if (!comment) {
        return res.status(400).json({ message: 'Comment not found' });
    }

    comment.content = content;

    await comment.save();

    res.json({ message: 'Comment has been updated' });
})

const deleteComment = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Post ID required' });
    }

    const comment = await Comment.findById(id).exec();

    if (!comment) {
        return res.status(400).json({ message: 'Comment not found' });
    }

    await comment.deleteOne();

    res.json({ message: 'Comment has been deleted' });
})

export = {
    getCommentByPost,
    createComment,
    updateComment,
    deleteComment
}