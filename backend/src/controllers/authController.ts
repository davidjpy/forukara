import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response } from 'express';

import User from '@models/User';
import { oAuthLoginHandler } from '@utilities/oAuthLoginHandler';
import { IUser, ErrorResponse, ErrorCode, JwtToken, OAuthLogin, ProfileInfo } from '@utilities/types';

// Login a user
const login = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const auth = req.query.auth as ('id' | 'oauth');
    let user;

    // Login user with OAuth 2.0 code
    if (auth === 'oauth') {

        const { authorizationCode, codeVerifier }: OAuthLogin = req.body;

        if (!authorizationCode || !codeVerifier) {
            return res.status(403).json({ message: 'Authorization code or code verifier missing' });
        }

        user = await oAuthLoginHandler(authorizationCode, codeVerifier);
    }
    
    // Login user with local account
    else {
        const { email, password }: ProfileInfo = req.body;
        let errorCodes: Array<ErrorResponse> = [];

        // Case 1: Email missing
        if (!email) {
            errorCodes.push({ error: 'Email is required', code: ErrorCode.EmailErr });
        }

        // Case 2: Password missing
        if (!password) {
            errorCodes.push({ error: 'Password is required', code: ErrorCode.PasswordErr });
        }

        if (errorCodes.length > 0) {
            return res.status(400).json({ message: errorCodes });
        }

        user = await User.findOne({ email }).lean().exec();

        // Case 3: User not found
        if (!user) {
            return res.status(404).json({ message: [{ error: `The Forukara account doesn't exist`, code: ErrorCode.EmailErr }] });
        }

        // Case 4: User not verified
        if (user.profile.status !== 'Active') {
            return res.status(401).json({ message: [{ error: `Account's email address was not verified` }] });
        }

        // Case 5: User password was not setted
        if (!user.profile.password) {
            return res.status(401).json({ message: [{ error: 'Your password is incorrect. Please try again', code: ErrorCode.PasswordErr }] });
        }

        const isValidPassword = await bcrypt.compare(password!, user.profile.password!);

        // Case 6: Incorrect password
        if (!isValidPassword) {
            return res.status(401).json({ message: [{ error: 'Your password is incorrect. Please try again', code: ErrorCode.PasswordErr }] });
        }
    }

    if (!user) {
        return res.status(404).json({ message: [{ error: `The Forukara account doesn't exist`, code: ErrorCode.UsernameErr }] });
    }

    const accessTokenPayload: JwtToken = { tokenId: user._id.toString(), tokenUsername: user.profile.username, tokenEmail: user.profile.email };
    const refreshTokenPayload: JwtToken = { tokenId: user._id.toString() };

    const accessToken = jwt.sign(accessTokenPayload, process.env.ACCESS_TOKEN_SECRET as Secret, { expiresIn: '1d' });
    const refreshToken = jwt.sign(refreshTokenPayload, process.env.REFRESH_TOKEN_SECRET as Secret, { expiresIn: '7d' });


    // Store refresh token in cookie
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });


    const { profile: { username, preferredName, avatar, background, gender, location, title, occupation, biography, socialMedia }, connections, discussions, createdAt } = user;

    const userPayload: IUser = {
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
        const { tokenId } = payload as JwtToken;

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
        const accessTokenPayload: JwtToken = { tokenId: user._id.toString(), tokenUsername: user.profile.username, tokenEmail: user.profile.email };
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

// Google OAuth handler
const googleOAuth = (req: Request, res: Response): void => {

    const challenge = req.query.challenge as string;
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Google OAuth authorization endpoint query params
    const options = {
        redirect_uri: process.env.CLIENT_HOST as string,
        client_id: process.env.GOOGLE_CLIENT_ID as string,
        response_type: 'code',
        code_challenge: challenge,
        code_challenge_method: 'S256',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' ')
    };

    const qs = new URLSearchParams(options);
    
    res.redirect(`${rootUrl}?${qs.toString()}`);
}

// Linkedin OAuth handler
const linkedinOAuth = (req: Request, res: Response): void => {

    const challenge = req.query.challenge as string;
    const state = req.query.state as string;
    const rootUrl = 'https://www.linkedin.com/oauth/native-pkce/authorization';

    // Linkedin OAuth authorization endpoint query params, state is required accounting to Linkedin API
    const options = {
        redirect_uri: process.env.CLIENT_HOST as string,
        client_id: process.env.LINKEDIN_CLIENT_ID as string,
        response_type: 'code',
        code_challenge: challenge,
        code_challenge_method: 'S256',
        state: state,
        scope: [
            'r_liteprofile', 
            'r_emailaddress'
        ].join(' ')
    };

    const qs = new URLSearchParams(options);
    
    res.redirect(`${rootUrl}?${qs.toString()}`);
}

export = {
    login,
    refresh,
    logout,
    googleOAuth,
    linkedinOAuth
}