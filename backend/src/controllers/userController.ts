import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response } from 'express';
import path from 'path';

import User from '@models/User';
import emailService from '@utilities/emailService';

interface Token {
    tokenId: string;
    tokenUsername: string;
    tokenEmail: string;
}

const getAllUsers = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const users = await User.find().select('-password').lean();

    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' });
    }

    res.json(users);
});

const createUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { username, password, email }: { username: string, password: string, email: string } = req.body;

    if (!username || !password || !email) {
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
    const userObj = { username, 'password': hashedPwd, email }
    const user = await User.create(userObj);

    const payload: { tokenId: string, tokenUsername: string, tokenEmail: string } =
        { tokenId: user._id.toString(), tokenUsername: user.username, tokenEmail: user.email }

    const token = jwt.sign(payload, process.env.VERIFICATION_SECRET_KEY as Secret, { expiresIn: '300s' });

    const emailOptions = {
        HTMLTemplate: 'emailVerification.html',
        replacement: { 
            username: username, 
            url: `http://localhost:3500/users/verifications/${token}/` 
        },
        target: email, 
        subject: 'Verify Your Forukara Account'
    }

    emailService(emailOptions);

    if (user && token) {
        res.status(201).json({ message: `User ${username} created` });
    } else {
        res.status(400).json({ message: 'Invalid user data received' });
    }
});

const updateUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id, username, password, email }: { id: string, username: string, password: string, email: string } = req.body;

    if (!id || !username || !email) {
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

    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    res.json({ message: `User ${updatedUser.username} has been updated` });
});

const deleteUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id }: { id: string } = req.body;

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

const verifiyUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const token: string = req.params.token;

    try {
        const userToken = jwt.verify(token, process.env.VERIFICATION_SECRET_KEY as Secret);
        const { tokenId, tokenUsername, tokenEmail } = userToken as Token;

        if (!tokenId || !tokenUsername || !tokenEmail) {
            return res.status(401).json({ message: 'The verification link is invalid' });
        }

        const user = await User.findOne({ _id: tokenId, username: tokenUsername, email: tokenEmail }).exec();

        if (!user) {
            return res.status(401).json({ message: 'The verification link is invalid' });
        }

        if (user.status === 'Active') {
            return res.status(404).json({ message: 'Account was already verified' });
        }

        user.status = 'Active';
        user.expiredIn = null;
        await user.save();

        res.json({ message: `Account ${user.username} verified` });
    } catch (err) {
        return res.status(401).json({ message: 'The verification link is invalid' });
    }
});


const testing = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const testing = {HTMLTemplate: 'emailVerification.html', replacement: { username: 'AzCean', url: 'http://localhost:3500/users/test' }, target: 'david1999.hch@gmail.com', subject: 'testing'}
    // emailService(testing)
    res.sendFile(path.resolve('src/views/emailVerification.html'))
});


export = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    verifiyUser,
    testing
}