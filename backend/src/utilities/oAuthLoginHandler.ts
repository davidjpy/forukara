import jwt from 'jsonwebtoken';
import axios from 'axios';

import User from '@models/User';
import { oAuthCredentialHandler } from '@utilities/oAuthCredentialHandler';
import { IUser, AuthProvider } from '@utilities/types';

type OAuthProfile = {
    email: string;
    name: string;
    picture: string;
};

type GoogleResult = {
    access_token: string;
    refresh_token: string;
    id_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
}

type LinkedinResult = {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_token_expires_in: number;
    scope: string;
}

export const oAuthLoginHandler = async (authorizationCode: string, codeVerifier: string | null, provider: AuthProvider) => {

    let user;

    // Google OAuth for access token
    if (provider === 'google' && codeVerifier) {

        // Google endpoint url
        const url = 'https://oauth2.googleapis.com/token';

        // Google token endpoint options
        const options = {
            code: authorizationCode,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            code_verifier: codeVerifier,
            redirect_uri: process.env.CLIENT_HOST,
            grant_type: 'authorization_code'
        };

        // Get tokens
        const authResults: GoogleResult = await oAuthCredentialHandler(options, url);

        // Get user info from Google token
        const profile = jwt.decode(authResults.id_token) as OAuthProfile;

        // Check for any matches for Google email
        user = await User.findOne({ 'profile.email': profile.email }).lean().exec();

        // Create user with provided email
        if (!user) {
            const userObj: IUser = {
                profile: {
                    username: profile.name.trim(),
                    email: profile.email,
                    avatar: profile.picture,
                    status: 'Active',
                    expiredIn: null
                }
            };

            user = await User.create(userObj);
        }
    }

    // Linkedin OAuth for access token
    if (provider === 'linkedin') {
        // Linkedin endpoint url
        const url = 'https://www.linkedin.com/oauth/v2/accessToken';

        // Google token endpoint options
        const options = {
            grant_type: 'authorization_code',
            code: authorizationCode,
            client_id: process.env.LINKEDIN_CLIENT_ID,
            client_secret: process.env.LINKEDIN_CLIENT_SECRET,
            redirect_uri: process.env.CLIENT_HOST,
        }

        // Get tokens
        const authResults: LinkedinResult = await oAuthCredentialHandler(options, url);
        console.log(authResults)
        // Get user info from Linkedin token
        const infoUrl = 'https://api.linkedin.com/v2/me';

        const response = await axios.get(infoUrl, {
            headers: {
                'Authorization': `Bearer ${authResults.access_token}`
            }
        });
        console.log(response.data);
    }

    return user;
}