import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import User from '@model/User';

const getAllUsers = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const users = await User.find().select('-password').lean();

    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' });
    }

    res.json(users);
});

const createUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { username, password, email, roles } = req.body;

    if (!username || !password || !email || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const duplicateUsername = await User.findOne({ username }).lean().exec();
    const duplicateEmail = await User.findOne({ email }).lean().exec();

    if (duplicateUsername) {
        return res.status(409).json({ message: 'Username has already taken' });
    }

    if (duplicateEmail) {
        return res.status(409).json({ message: 'Email has already taken' });
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    const userObj = { username, 'password': hashedPwd, email, roles }
    const user = await User.create(userObj);

    if (user) {
        res.status(201).json({ message: `User ${username} created` });
    } else {
        res.status(400).json({ message: 'Invalid user data received' });
    }
});

const updateUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id, username, password, email, roles } = req.body;

    if (!id || !username || !email || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const duplicateUsername = await User.findOne({ username }).lean().exec();
    const duplicateEmail = await User.findOne({ email }).lean().exec();

    if (duplicateUsername && duplicateUsername?._id.toString() !== id) {
        return res.status(409).json({ message: 'Username has already taken' });
    }

    if (duplicateEmail && duplicateEmail?._id.toString() !== id) {
        return res.status(409).json({ message: 'Email has already taken' });
    }

    user.username = username;
    user.email = email;
    user.roles = roles;

    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    res.json({ message: `User ${updatedUser.username} has been updated` });
});

const deleteUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'User ID required' });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const result = await user.deleteOne();

    res.json({ message: `User ${result.username} deleted` });
});

export = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}