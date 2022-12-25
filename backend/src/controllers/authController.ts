import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response } from 'express';

import User from '@models/User';
import { IUser, IErrorResponse, ErrorCode, IToken } from '@utilities/types';

// Login a user
const login = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { token, username, password }: IUser = req.body;
    let user;

    // Login user with OAuth 2.0 returned token
    if (token) {
        const payload = jwt.verify(token, process.env.OAUTH_TOKEN_SECRET as Secret);
        const { tokenId } = payload as IToken;
        console.log(payload)
        user = await User.findById(tokenId).lean().exec();
    }
    // Login user with local account
    else {
        let errorCodes: Array<IErrorResponse> = [];

        // Case 1: Username missing
        if (!username) {
            errorCodes.push({ error: 'Username is required', code: ErrorCode.UsernameErr });
        }

        // Case 2: Password missing
        if (!password) {
            errorCodes.push({ error: 'Password is required', code: ErrorCode.PasswordErr });
        }

        if (errorCodes.length > 0) {
            return res.status(400).json({ message: errorCodes });
        }

        user = await User.findOne({ username }).lean().exec();

        // Case 3: User not found
        if (!user) {
            return res.status(404).json({ message: [{ error: `The Forukara account doesn't exist`, code: ErrorCode.UsernameErr }] });
        }

        // Case 4: User not verified
        if (user.status !== 'Active') {
            return res.status(401).json({ message: [{ error: `Account's email address was not verified` }] });
        }

        const isValidPassword = await bcrypt.compare(password!, user.password!);

        // Case 5: Incorrect password
        if (!isValidPassword) {
            return res.status(401).json({ message: [{ error: 'Your password is incorrect. Please try again', code: ErrorCode.PasswordErr }] });
        }
    }

    if (!user) {
        return res.status(404).json({ message: [{ error: `The Forukara account doesn't exist`, code: ErrorCode.UsernameErr }] });
    }

    const accessTokenPayload: IToken = { tokenId: user._id.toString(), tokenUsername: username, tokenEmail: user.email };
    const refreshTokenPayload: IToken = { tokenId: user._id.toString() };

    const accessToken = jwt.sign(accessTokenPayload, process.env.ACCESS_TOKEN_SECRET as Secret, { expiresIn: '1d' });
    const refreshToken = jwt.sign(refreshTokenPayload, process.env.REFRESH_TOKEN_SECRET as Secret, { expiresIn: '7d' });


    // Store refresh token in cookie
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const userPayload: IUser = {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        createdAt: user.createdAt
    };

    res.json({ message: { token: accessToken, user: userPayload } });
});

// Persist a user
const refresh = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const cookies = req.cookies;

    // Case 1: Cookie missing
    if (!cookies?.jwt) {
        return res.status(401).json({ message: { error: 'Unauthorized acess', code: ErrorCode.AuthErr } });
    }

    const refreshToken: string = cookies.jwt;

    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as Secret);
        const { tokenId } = payload as IToken;

        // Case 2: Token missing
        if (!tokenId) {
            return res.status(401).json({ message: { error: 'ID missing', code: ErrorCode.AuthErr } });
        }

        const user = await User.findById(tokenId).select('-password').lean().exec();

        // Case 3: User not found
        if (!user) {
            return res.status(404).json({ message: 'User not found', code: ErrorCode.AuthErr });
        }

        // Assign new token
        const accessTokenPayload: IToken = { tokenId: user._id.toString(), tokenUsername: user.username, tokenEmail: user.email };
        const accessToken = jwt.sign(accessTokenPayload, process.env.ACCESS_TOKEN_SECRET as Secret, { expiresIn: '1d' });

        res.json({ message: { token: accessToken, id: user._id.toString() } });
    } catch (err) {
        return res.status(401).json({ message: { error: 'Invalid token', code: ErrorCode.AuthErr } });
    }
});

// Logout a user
const logout = (req: Request, res: Response): any => {
    const cookies = req.cookies;

    // Case 1: User already logout
    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }

    // Clear cookie
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });

    res.json({ message: 'Logout successful' });
};

// Google oauth handler 
const googleOauth = (req: Request, res: Response) => {
    const user = req.user as IUser;
    console.log(user)
    const refreshTokenPayload: IToken = {
        tokenId: user._id!.toString(),
        tokenEmail: user.email,
        tokenUsername: user.username
    };

    const idToken = jwt.sign(
        refreshTokenPayload,
        process.env.OAUTH_TOKEN_SECRET as Secret,
        { expiresIn: '10m' }
    );

    return res.redirect(process.env.CLIENT_HOST as string + `/?token=${idToken}`);
};

export = {
    login,
    refresh,
    logout,
    googleOauth
}