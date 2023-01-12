import jwt from 'jsonwebtoken';
import axios from 'axios';

import User from '@models/User';
import { oAuthGetCredentialHandler } from '@utilities/oAuthGetCredentialHandler';
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
    let error;

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
        const authResults: GoogleResult = await oAuthGetCredentialHandler(options, url);

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
        const authResults: LinkedinResult = await oAuthGetCredentialHandler(options, url);

        // Get user info from Linkedin token
        const root = 'https://api.linkedin.com/v2';

        const userEndpoints = [
            `${root}/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))`,
            `${root}/me?projection=(localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))`
        ];

        const getUserInfo = async () => {
            const responses = await Promise.all(
                userEndpoints.map(async (endpoint) => (
                    await axios.get(endpoint, {
                        headers: {
                            'Authorization': `Bearer ${authResults.access_token}`
                        }
                    })
                ).data)
            );

            const userInfo = {
                username: `${responses[1].localizedFirstName.trim()} ${responses[1].localizedLastName.trim()}`,
                email: responses[0].elements[0]['handle~'].emailAddress,
                avatar: responses[1].profilePicture['displayImage~'].elements[0].identifiers[0].identifier,
                status: 'Active',
                expiredIn: null
            }

            return userInfo;
        }

        const profile = await getUserInfo() as unknown as OAuthProfile;

        // Return error if no email address was found in the Linkedin account
        if (!profile.email) {
            error = 'There is no email address associated with this LinkedIn account; it is most likely a phone number registered account.';
            return error;
        }

        // Check for any matches for Google email
        user = await User.findOne({ 'profile.email': profile.email }).lean().exec();

        // Create user with provided email
        if (!user) {
            const userObj: IUser = {
                profile: profile
            };

            user = await User.create(userObj);
        }
    }

    return user;
}
