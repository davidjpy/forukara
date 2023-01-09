import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response } from 'express';
import * as EmailValidator from 'email-validator';
import sharp from 'sharp';
import path from 'path';

import User from '@models/User';
import emailService from '@utilities/emailService';
import { IUser, JwtToken, ErrorResponse, ErrorCode, ProfileInfo, ProfileSocialMedia, ProfileBio } from '@utilities/types';

// Get all users
const getAllUsers = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const users: Array<IUser> = await User.find().select(['-profile.password']).lean();

    // Case 1: No users found
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found', code: ErrorCode.Failed });
    }

    res.json(users);
});

// Get specific user by its username
const getUserByUsername = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const username: string = req.params.username;

    // Case 1: Id missing
    if (!username) {
        return res.status(400).json({ message: 'All fields are required', code: ErrorCode.Failed });
    }

    const user = await User.findOne({ 'profile.username': username }).select(['-profile.password', '-profile.email']).lean().exec();

    // Case 2: User not found
    if (!user) {
        return res.status(404).json({ message: 'User not found', code: ErrorCode.Failed });
    }

    const { profile: { preferredName, avatar, background, gender, location, title, occupation, biography, socialMedia }, connections, discussions, createdAt } = user;

    const returnPayload: IUser = {
        id: user._id.toString(),
        profile: {
            username: username,
            preferredName: preferredName,
            avatar: avatar,
            background: background,
            gender: gender,
            location: location,
            title: title,
            occupation: occupation,
            biography: biography,
            socialMedia: socialMedia
        },
        discussions: discussions,
        connections: connections,
        createdAt: createdAt,
    };

    res.json({ message: returnPayload });   
});

// Get account info by id
const getAccountById = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const id: string = req.params.id;

    // Case 1: Id missing
    if (!id) {
        return res.status(400).json({ message: 'All fields are required', code: ErrorCode.Failed });
    }

    const user = await User.findById(id).select(['-profile.password']).lean().exec();

    // Case 2: User not found
    if (!user) {
        return res.status(404).json({ message: 'User not found', code: ErrorCode.Failed });
    }

    const { profile: { email, username, preferredName, avatar, background, gender, location, title, occupation, biography, socialMedia }, connections, discussions, createdAt } = user;

    const returnPayload: IUser = {
        id: user._id.toString(),
        profile: {
            email: email,
            username: username,
            preferredName: preferredName,
            avatar: avatar,
            background: background,
            gender: gender,
            location: location,
            title: title,
            occupation: occupation,
            biography: biography,
            socialMedia: socialMedia
        },
        discussions: discussions,
        connections: connections,
        createdAt: createdAt,
    };

    res.json({ message: returnPayload });
});

// Create new user
const createUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { username, password, confirmPassword, email }: ProfileInfo = req.body;

    // Buffer array for holding the missing error messages
    let errorCodes: Array<ErrorResponse> = [];

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

    const duplicateUsername = await User.findOne({ 'profile.username': username }).lean().exec();
    const duplicateEmail = await User.findOne({ 'profile.email': email }).lean().exec();

    // Case 7: Username already taken
    if (duplicateUsername) {
        return res.status(409).json({ message: [{ error: 'Username already in use', code: ErrorCode.UsernameErr }] });
    }

    // Case 8: Email address already taken
    if (duplicateEmail) {
        return res.status(409).json({ message: [{ error: 'Email already in use', code: ErrorCode.EmailErr }] });
    }

    // Encrypt password before storing it to MongoDB
    const hashedPwd = await bcrypt.hash(password!, 10);
    const userObj: IUser = { profile: {username, 'password': hashedPwd, email} };

    const user = await User.create(userObj);

    const payload: JwtToken = { tokenId: user._id.toString(), tokenUsername: user.profile.username!, tokenEmail: user.profile.email! };

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

// Update account info
const updateAccountInfoById = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const id: string = req.params.id;
    const { username, preferredName, location, occupation, title, gender, avatar, background, twitter, linkedin, facebook }: ProfileInfo & ProfileSocialMedia = req.body;

    // Case 1: Missing fields
    if (!id || !username) {
        return res.status(400).json({ message: 'All fields are required', code: ErrorCode.Failed });
    }

    const user = await User.findById(id).exec();

    // Case 2: User not found
    if (!user) {
        return res.status(400).json({ message: 'User not found', code: ErrorCode.Failed });
    }

    const duplicateUsername = await User.findOne({ 'profile.username': username }).lean().exec();

    // Case 3: Username already taken
    if (duplicateUsername && duplicateUsername?._id.toString() !== id) {
        return res.status(409).json({ message: 'Username has already taken', code: ErrorCode.UsernameErr });
    }

    user.profile.username = username;
    user.profile.preferredName = preferredName;
    user.profile.location = location;
    user.profile.title = title;
    user.profile.gender = gender;
    user.profile.occupation = occupation;

    user.profile.socialMedia = {
        twitter: twitter,
        linkedin: linkedin,
        facebook: facebook
    };

    // Handle the image upload
    const { avatarFile, backgroundFile }: any = req.files;

    if (avatarFile) {
        // Convert small avatar image to a smaller size
        await sharp(avatarFile[0].path)
            .resize({
                height: 400,
                width: 400
            })
            .webp({
                quality: 60
            })
            .toFile(`${avatarFile[0].destination}/${path.parse(avatarFile[0].filename).name}.webp`);

        user.profile.avatar = `${process.env.HOST}/images/${path.parse(avatarFile[0].filename).name}.webp`;
    }
    else if (avatar) {
        user.profile.avatar = avatar;
    }
    else {
        user.profile.avatar = '';
    }

    if (backgroundFile) {
        // Convert large background image to 16:9 ratio with lower dpi
        await sharp(backgroundFile[0].path)
            .resize({
                width: 1920,
                height: 1080
            })
            .webp({
                quality: 60
            })
            .toFile(`${backgroundFile[0].destination}/${path.parse(backgroundFile[0].filename).name}.webp`);

        user.profile.background = `${process.env.HOST}/images/${path.parse(backgroundFile[0].filename).name}.webp`;
    } else if (background) {
        user.profile.background = background;
    }
    else {
        user.profile.background = '';
    }

    const updatedUser = await user.save();

    res.json({ message: `User ${updatedUser.profile.username} has been updated` });
});

const updateAccountBioById = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const id: string = req.params.id;
    const { about }: ProfileBio = req.body;

    console.log(id, req.body)

    // Case 1: Missing fields
    if (!id) {
        return res.status(400).json({ message: 'All fields are required', code: ErrorCode.Failed });
    }

    const user = await User.findById(id).exec();

    // Case 2: User not found
    if (!user) {
        return res.status(400).json({ message: 'User not found', code: ErrorCode.Failed });
    }

    user.profile.biography = {
        about: about
    }

    const updatedUser = await user.save();

    res.json({ message: `User ${updatedUser.profile.username} has been updated` });
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

    res.json({ message: `User ${result.profile.username} deleted` });
});

// Email verification 
const verifiyUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const token: string = req.params.token;

    try {
        // Decrypt the token recevied 
        const userToken = jwt.verify(token, process.env.VERIFICATION_SECRET_KEY as Secret);
        const { tokenId, tokenUsername, tokenEmail } = userToken as JwtToken;

        // Case 1: Token payload missing
        if (!tokenId || !tokenUsername || !tokenEmail) {
            return res.status(401).json({ message: 'The verification link is invalid', code: ErrorCode.Failed });
        }

        const user = await User.findOne({ _id: tokenId, 'profile.username': tokenUsername, 'profile.email': tokenEmail }).exec();

        // Case 2: User not found
        if (!user) {
            return res.status(401).json({ message: 'The verification link is invalid', code: ErrorCode.Failed });
        }

        // Case 3: User already verified
        if (user.profile.status === 'Active') {
            return res.status(404).json({ message: 'Account was already verified', code: ErrorCode.Failed });
        }

        user.profile.status = 'Active';
        user.profile.expiredIn = null;
        await user.save();

        res.json({ message: `Account ${user.profile.username} verified` });
    } catch (err) {
        // Case 4: Unable to decrypt jwt token
        return res.status(401).json({ message: 'The verification link is invalid', code: ErrorCode.Failed });
    }
});

// Get another verification email
const resendVerification = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { email }: ProfileInfo = req.body;

    // Case 1: Email missing
    if (!email) {
        return res.status(400).json({ message: { error: 'Email not found', code: ErrorCode.EmailErr } });
    }

    const user = await User.findOne({ 'profile.email': email }).select(['-profile.password']).lean().exec();

    // Case 2: User already deleted due to ten minute TTL index
    if (!user) {
        return res.status(400).json({ message: { error: 'Due to the ten minute verification timer expired, the account has been deleted. Please sign up once again', code: ErrorCode.Failed } });
    }

    // Case 3: User already verified
    if (user.profile.status === 'Active') {
        return res.status(400).json({ message: { error: 'Account has been verified' }, code: ErrorCode.Failed });
    }

    const payload: JwtToken = { tokenId: user._id.toString(), tokenUsername: user.profile.username!, tokenEmail: user.profile.email! }

    // Create another token for email verification endpoint
    const token = jwt.sign(payload, process.env.VERIFICATION_SECRET_KEY as Secret, { expiresIn: '300s' });

    // Verification email options
    const emailOptions = {
        HTMLTemplate: 'emailVerification.html',
        replacement: {
            username: user.profile.username,
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
    deleteUser,
    getAccountById,
    updateAccountInfoById,
    updateAccountBioById,
    verifiyUser,
    resendVerification,
    testing
}
