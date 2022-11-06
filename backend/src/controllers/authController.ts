import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response } from 'express';

import User from '@models/User';
import { IUser, IErrorResponse, ErrorCode, IToken } from '@utilities/types';

const login = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { username, password }: IUser = req.body;

    let errorCodes: Array<IErrorResponse> = [];

    if (!username) {
        errorCodes.push({ error: 'Username is required', code: ErrorCode.UsernameErr });
    }

    if (!password) {
        errorCodes.push({ error: 'Password is required', code: ErrorCode.PasswordErr });
    }

    if (errorCodes.length > 0) {
        return res.status(400).json({ message: errorCodes });
    }

    const user = await User.findOne({ username }).lean().exec();

    if (!user) {
        return res.status(400).json({ message: [{ error: `The Forukara account doesn't exist`, code: ErrorCode.UsernameErr }]});
    }

    if (user.status !== 'Active') {
        return res.status(401).json({ message: [{ error: `Account's email address was not verified`}] });
    }
    
    const isValidPassword = await bcrypt.compare(password!, user.password!);

    if (!isValidPassword) {
        return res.status(401).json({ message: [{ error: 'Your password is incorrect. Please try again', code: ErrorCode.PasswordErr }]});
    }

    const accessTokenPayload: IToken = { tokenId: user._id.toString(), tokenUsername: username!, tokenEmail: user.email! };
    const refreshTokenPayload: IToken = { tokenId: user._id.toString() };

    const accessToken = jwt.sign(accessTokenPayload, process.env.ACCESS_TOKEN_SECRET as Secret, { expiresIn: '1m' });
    const refreshToken = jwt.sign(refreshTokenPayload, process.env.REFRESH_TOKEN_SECRET as Secret, { expiresIn: '5m' });

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 5 * 60 * 1000
    });

    res.json({ message: accessToken });
});

const refresh = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.status(401).json({ message: { error: 'Unauthorized acess', code: ErrorCode.AuthErr } });
    }

    const refreshToken: string = cookies.jwt;

    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as Secret);
        const { tokenId } = payload as IToken;

        if (!tokenId) {
            return res.status(401).json({ message: { error: 'ID missing', code: ErrorCode.AuthErr } });
        }

        const user = await User.findById(tokenId).lean().exec();

        if (!user) {
            return res.status(404).json({ message: 'User not found', code: ErrorCode.AuthErr });
        }

        const accessTokenPayload: IToken = { tokenId: user._id.toString(), tokenUsername: user.username, tokenEmail: user.email };
        const accessToken = jwt.sign(accessTokenPayload, process.env.ACCESS_TOKEN_SECRET as Secret, { expiresIn: '1m' });

        res.json({ message: accessToken });
    } catch (err) {
        return res.status(401).json({ message: { error: 'Invalid token', code: ErrorCode.AuthErr } });
    }
});

const logout = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }

    res.clearCookie('jwt', { 
        httpOnly: true, 
        secure: true,
        sameSite: 'none' 
    });

    res.json({ message: 'Logout successful' });
});

export = {
    login,
    refresh,
    logout
}