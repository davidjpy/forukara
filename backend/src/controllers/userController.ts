import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response } from 'express';
import * as EmailValidator from 'email-validator';
import sharp from 'sharp';
import path from 'path';

import User from '@models/User';
import emailService from '@utilities/emailService';
import { IUser, IToken, IErrorResponse, ErrorCode } from '@utilities/types';

// Get all users
const getAllUsers = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const users: Array<IUser> = await User.find().select('-password').lean();

    // Case 1: No users found
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found', code: ErrorCode.Failed });
    }

    res.json(users);
});

// Get specific user by document id
const getUserByUsername = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const username: string = req.params.username;

    // Case 1: Username missing
    if (!username) {
        return res.status(400).json({ message: 'Username is required', code: ErrorCode.Failed });
    }

    const user = await User.findOne({ username: username }).select(['-_id', '-email','-password']).lean().exec();
    // const user = await User.findById(id).select('-password').lean().exec();

    // Case 2: User not found
    if (!user) {
        return res.status(404).json({ message: 'User not found', code: ErrorCode.Failed });
    }

    const returnPayload: IUser = { 
        username: user.username, 
        avatar: user.avatar,
        background: user.background,
        about: user.about,
        discussion: user.discussion,
        followers: user.followers,
        following: user.following,
        createdAt: user.createdAt 
    };

    res.json({ message: returnPayload });
});

// Create new user
const createUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { username, password, confirmPassword, email }: IUser = req.body;

    // Buffer array for holding the missing error messages
    let errorCodes: Array<IErrorResponse> = [];

    // Case 1: Username missing
    if (!username) {
        errorCodes.push({ error: 'Username is required', code: ErrorCode.UsernameErr });
    }

    // Case 2: Email missing
    if (!email) {
        errorCodes.push({ error: 'Email is required', code: ErrorCode.EmailErr });
    }

    // Case 3: Password missing
    if (!password) {
        errorCodes.push({ error: 'Password is required', code: ErrorCode.PasswordErr });
    }

    // Case 4: ConfirmPassword missing
    if (!confirmPassword) {
        errorCodes.push({ error: 'Confirm your password', code: ErrorCode.ConfirmPasswordErr });
    }

    // Case 5: Password does not match with ConfirmPassword
    if (password !== confirmPassword) {
        errorCodes.push({ error: 'Your confirmation password is incorrect', code: ErrorCode.ConfirmPasswordErr });
    }

    // Return all missing errors
    if (errorCodes.length > 0) {
        return res.status(400).json({ message: errorCodes });
    }

    // Case 6: Invalid email address
    if (!EmailValidator.validate(email!)) {
        return res.status(400).json({ message: [{ error: 'Invalid email address', code: ErrorCode.EmailErr }] });
    }

    const duplicateUsername = await User.findOne({ username }).lean().exec();
    const duplicateEmail = await User.findOne({ email }).lean().exec();

    // Case 7: Username already taken
    if (duplicateUsername) {
        return res.status(409).json({ message: [{ error: 'Username already in use', code: ErrorCode.UsernameErr }] });
    }

    // Case 8: Email address already taken
    if (duplicateEmail) {
        return res.status(409).json({ message: [{ error: 'Email already in use', code: ErrorCode.EmailErr}] });
    }

    // Encrypt password before storing it to MongoDB
    const hashedPwd = await bcrypt.hash(password!, 10);
    const userObj = { username, 'password': hashedPwd, email };

    const user = await User.create(userObj);

    const payload: IToken = { tokenId: user._id.toString(), tokenUsername: user.username!, tokenEmail: user.email! };

    // Token for email verification endpoint
    const token = jwt.sign(payload, process.env.VERIFICATION_SECRET_KEY as Secret, { expiresIn: '300s' });

    // Verification email options
    const emailOptions = {
        HTMLTemplate: 'emailVerification.html',
        replacement: { 
            username: username!, 
            url: `${process.env.HOST}/users/verifications/${token}/` 
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

// Update existing user
const updateUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id, username, password, email }: IUser = req.body;  
    const { avatar, background }: any = req.files;

    // Convert small avatar image to much smaller size
    await sharp(avatar[0].path)
        .resize(300)
        .webp({
            quality: 80
        })
        .toFile(`${avatar[0].destination}/${path.parse(avatar[0].filename).name}.webp`);

    // Convert large background image to 16:9 ratio with lower dpi
    await sharp(background[0].path)
        .resize({
            width: 1920,
            height: 1080
        })
        .webp({
            quality: 80
        })
        .toFile(`${background[0].destination}/${path.parse(background[0].filename).name}.webp`);

    // Case 1: Missing fields
    if (!id || !username || !email) {
        return res.status(400).json({ message: 'All fields are required', code: ErrorCode.Failed });
    }

    const user = await User.findById(id).exec();

    // Case 2: User not found
    if (!user) {
        return res.status(400).json({ message: 'User not found', code: ErrorCode.Failed });
    }

    const duplicateUsername = await User.findOne({ username }).lean().exec();
    const duplicateEmail = await User.findOne({ email }).lean().exec();

    // Case 3: Username already taken
    if (duplicateUsername && duplicateUsername?._id.toString() !== id) {
        return res.status(409).json({ message: 'Username has already taken', code: ErrorCode.UsernameErr });
    }

    // Case 3: Email already taken
    if (duplicateEmail && duplicateEmail?._id.toString() !== id) {
        return res.status(409).json({ message: 'Email has already taken', code: ErrorCode.EmailErr });
    }

    user.username = username;
    user.email = email;
    user.avatar = `${process.env.HOST}/images/${path.parse(avatar[0].filename).name}.webp`;
    user.background = `${process.env.HOST}/images/${path.parse(background[0].filename).name}.webp`;

    // Encrypt password before storing it to MongoDB
    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    res.json({ message: `User ${updatedUser.username} has been updated` });
});

// Delete existing user
const deleteUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id }: IUser = req.body;

    // Case 1: Missing id
    if (!id) {
        return res.status(400).json({ message: 'User ID required', code: ErrorCode.UsernameErr });
    }

    const user = await User.findById(id).exec();

    // Case 2: User not found
    if (!user) {
        return res.status(400).json({ message: 'User not found', code: ErrorCode.Failed });
    }

    const result = await user.deleteOne();

    res.json({ message: `User ${result.username} deleted` });
});

// Email verification 
const verifiyUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const token: string = req.params.token;

    try {
        // Decrypt the token recevied 
        const userToken = jwt.verify(token, process.env.VERIFICATION_SECRET_KEY as Secret);
        const { tokenId, tokenUsername, tokenEmail } = userToken as IToken;

        // Case 1: Token payload missing
        if (!tokenId || !tokenUsername || !tokenEmail) {
            return res.status(401).json({ message: 'The verification link is invalid', code: ErrorCode.Failed });
        }

        const user = await User.findOne({ _id: tokenId, username: tokenUsername, email: tokenEmail }).exec();

        // Case 2: User not found
        if (!user) {
            return res.status(401).json({ message: 'The verification link is invalid', code: ErrorCode.Failed });
        }

        // Case 3: User already verified
        if (user.status === 'Active') {
            return res.status(404).json({ message: 'Account was already verified', code: ErrorCode.Failed });
        }

        user.status = 'Active';
        user.expiredIn = null;
        await user.save();

        res.json({ message: `Account ${user.username} verified` });
    } catch (err) {
        // Case 4: Unable to decrypt jwt token
        return res.status(401).json({ message: 'The verification link is invalid', code: ErrorCode.Failed });
    }
});

// Get another verification email
const resendVerification = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { email }: IUser = req.body;

    // Case 1: Email missing
    if (!email) {
        return res.status(400).json({ message: { error: 'Email not found', code: ErrorCode.EmailErr } });
    }

    const user = await User.findOne({ email: email }).select('-password').lean().exec();

    // Case 2: User already deleted due to ten minute TTL index
    if (!user) {
        return res.status(400).json({ message: { error: 'Due to the ten minute verification timer expired, the account has been deleted. Please sign up once again', code: ErrorCode.Failed } });
    }

    // Case 3: User already verified
    if (user.status === 'Active') {
        return res.status(400).json({ message: { error: 'Account has been verified'}, code: ErrorCode.Failed });
    }

    const payload: IToken = { tokenId: user._id.toString(), tokenUsername: user.username!, tokenEmail: user.email! }

    // Create another token for email verification endpoint
    const token = jwt.sign(payload, process.env.VERIFICATION_SECRET_KEY as Secret, { expiresIn: '300s' });

    // Verification email options
    const emailOptions = {
        HTMLTemplate: 'emailVerification.html',
        replacement: { 
            username: user.username, 
            url: `${process.env.HOST}/users/verifications/${token}/` 
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
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser,
    verifiyUser,
    resendVerification,
    testing
}
