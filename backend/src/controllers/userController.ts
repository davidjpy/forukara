import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response } from 'express';
import * as EmailValidator from 'email-validator';

import User from '@models/User';
import emailService from '@utilities/emailService';

import { IUser, IToken, IErrorResponse, ErrorCode } from '@utilities/types';

// Add an additional handler
const getAllUsers = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const users = await User.find().select('-password').lean();

    if (!users?.length) {
        return res.status(400).json({ message: 'No users found', code: ErrorCode.Failed });
    }

    res.json(users);
});

const getUserById = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const id: string = req.params.id;

    if (!id) {
        return res.status(400).json({ message: 'All fields are required', code: ErrorCode.Failed });
    }

    const user = await User.findById(id).select('-password').lean().exec();

    if (!user) {
        return res.status(404).json({ message: 'User not found', code: ErrorCode.Failed });
    }

    res.json(user);
})

const createUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { username, password, confirmPassword, email }: IUser = req.body;

    let errorCodes: Array<IErrorResponse> = [];

    if (!username) {
        errorCodes.push({ error: 'Username is required', code: ErrorCode.UsernameErr });
    }

    if (!email) {
        errorCodes.push({ error: 'Email is required', code: ErrorCode.EmailErr });
    }

    if (!password) {
        errorCodes.push({ error: 'Password is required', code: ErrorCode.PasswordErr });
    }

    if (!confirmPassword) {
        errorCodes.push({ error: 'Confirm your password', code: ErrorCode.ConfirmPasswordErr });
    }

    if (password !== confirmPassword) {
        errorCodes.push({ error: 'Your confirmation password is incorrect', code: ErrorCode.ConfirmPasswordErr });
    }

    if (errorCodes.length > 0) {
        return res.status(400).json({ message: errorCodes });
    }

    if (!EmailValidator.validate(email!)) {
        return res.status(400).json({ message: [{ error: 'Invalid email address', code: ErrorCode.EmailErr }] });
    }

    const duplicateUsername = await User.findOne({ username }).lean().exec();
    const duplicateEmail = await User.findOne({ email }).lean().exec();

    if (duplicateUsername) {
        return res.status(409).json({ message: [{ error: 'Username already in use', code: ErrorCode.UsernameErr }] });
    }

    if (duplicateEmail) {
        return res.status(409).json({ message: [{ error: 'Email already in use', code: ErrorCode.EmailErr}] });
    }

    const hashedPwd = await bcrypt.hash(password!, 10);
    const userObj = { username, 'password': hashedPwd, email };
    const user = await User.create(userObj);

    const payload: IToken = { tokenId: user._id.toString(), tokenUsername: user.username!, tokenEmail: user.email! };

    const token = jwt.sign(payload, process.env.VERIFICATION_SECRET_KEY as Secret, { expiresIn: '300s' });

    const emailOptions = {
        HTMLTemplate: 'emailVerification.html',
        replacement: { 
            username: username!, 
            url: `http://localhost:3500/users/verifications/${token}/` 
        },
        target: email!, 
        subject: 'Verify Your Forukara Account'
    }

    emailService(emailOptions);

    if (user && token) {
        res.status(201).json({ message: `User ${username} created` });
    } else {
        res.status(400).json({ message: [{ error: 'Invalid user data received', code: ErrorCode.Failed }] });
    }
});

const updateUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id, username, password, email }: IUser = req.body;

    if (!id || !username || !email) {
        return res.status(400).json({ message: 'All fields are required', code: ErrorCode.Failed });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: 'User not found', code: ErrorCode.Failed });
    }

    const duplicateUsername = await User.findOne({ username }).lean().exec();
    const duplicateEmail = await User.findOne({ email }).lean().exec();

    if (duplicateUsername && duplicateUsername?._id.toString() !== id) {
        return res.status(409).json({ message: 'Username has already taken', code: ErrorCode.UsernameErr });
    }

    if (duplicateEmail && duplicateEmail?._id.toString() !== id) {
        return res.status(409).json({ message: 'Email has already taken', code: ErrorCode.EmailErr });
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
    const { id }: IUser = req.body;

    if (!id) {
        return res.status(400).json({ message: 'User ID required', code: ErrorCode.UsernameErr });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: 'User not found', code: ErrorCode.Failed });
    }

    const result = await user.deleteOne();

    res.json({ message: `User ${result.username} deleted` });
});

const verifiyUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const token: string = req.params.token;

    try {
        const userToken = jwt.verify(token, process.env.VERIFICATION_SECRET_KEY as Secret);
        const { tokenId, tokenUsername, tokenEmail } = userToken as IToken;

        if (!tokenId || !tokenUsername || !tokenEmail) {
            return res.status(401).json({ message: 'The verification link is invalid', code: ErrorCode.Failed });
        }

        const user = await User.findOne({ _id: tokenId, username: tokenUsername, email: tokenEmail }).exec();

        if (!user) {
            return res.status(401).json({ message: 'The verification link is invalid', code: ErrorCode.Failed });
        }

        if (user.status === 'Active') {
            return res.status(404).json({ message: 'Account was already verified', code: ErrorCode.Failed });
        }

        user.status = 'Active';
        user.expiredIn = null;
        await user.save();

        res.json({ message: `Account ${user.username} verified` });
    } catch (err) {
        return res.status(401).json({ message: 'The verification link is invalid', code: ErrorCode.Failed });
    }
});

const resendVerification = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { email }: IUser = req.body;

    if (!email) {
        return res.status(400).json({ message: { error: 'Email not found', code: ErrorCode.EmailErr } });
    }

    const user = await User.findOne({ email: email }).select('-password').lean().exec();

    if (!user) {
        return res.status(400).json({ message: { error: 'Due to the ten minute verification timer expired, the account has been deleted. Please sign up once again', code: ErrorCode.Failed } });
    }

    if (user.status === 'Active') {
        return res.status(400).json({ message: { error: 'Account has been verified'}, code: ErrorCode.Failed });
    }

    const payload: IToken = { tokenId: user._id.toString(), tokenUsername: user.username!, tokenEmail: user.email! }

    const token = jwt.sign(payload, process.env.VERIFICATION_SECRET_KEY as Secret, { expiresIn: '300s' });

    const emailOptions = {
        HTMLTemplate: 'emailVerification.html',
        replacement: { 
            username: user.username, 
            url: `http://localhost:3500/users/verifications/${token}/` 
        },
        target: email, 
        subject: 'Verify Your Forukara Account'
    }

    emailService(emailOptions);

    if (token) {
        res.status(201).json({ message: 'Verification email has been sent' });
    } else {
        res.status(400).json({ message: { error: 'Server error', code: ErrorCode.Failed } });
    }
});

const testing = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    // const testing = {HTMLTemplate: 'emailVerification.html', replacement: { username: 'AzCean', url: 'http://localhost:3500/users/test' }, target: 'david1999.hch@gmail.com', subject: 'testing'}
    // emailService(testing)
    // res.sendFile(path.resolve('src/views/emailVerification.html'))
});


export = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    verifiyUser,
    resendVerification,
    testing
}
