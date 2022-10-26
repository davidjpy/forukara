import { ObjectId } from 'mongoose';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

import Post from '@model/Post';

const getAllPosts = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const posts = await Post.find().lean();

    if (!posts?.length) {
        return res.status(400).json({ message: 'No posts found' });
    }

    res.json(posts);
});

const createPost = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id, title, content } = req.body;

    if (!id || !title || !content) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const postObj = { 'user': id, title, content }
    const post = await Post.create(postObj);

    if (post) {
        res.status(201).json({ message: 'Post created' });
    } else {
        res.status(400).json({ message: 'Invalid post data received' });
    }
});

const updatePost = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id, title, content } = req.body;

    if (!id || !title || !content ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const post = await Post.findById(id).exec();

    if (!post) {
        return res.status(400).json({ message: 'Post not found' });
    }

    post.title = title;
    post.content = content;

    await post.save();

    res.json({ message: `Post has been updated` });
});

const deletePost = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Post ID required' });
    }

    const post = await Post.findById(id).exec();

    if (!post) {
        return res.status(400).json({ message: 'Post not found' });
    }

    await post.deleteOne();

    res.json({ message: 'Post has been deleted' });
});

export = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost
}
