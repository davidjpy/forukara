import jwt from 'jsonwebtoken';

import User from '@models/User';
import { oAuthCredentialHandler } from '@utilities/oAuthCredentialHandler';
import { IUser } from '@utilities/types';

type OAuthProfile = {
    email: string;
    name: string;
    picture: string;
};

export const oAuthLoginHandler = async (authorizationCode: string, codeVerifier: string) => {
    // Get Goolge tokens
    const authResults = await oAuthCredentialHandler(authorizationCode, codeVerifier);

    // Get user info from Google token
    const profile = jwt.decode(authResults.id_token) as OAuthProfile;

    // Check for any matches for Google email
    let user = await User.findOne({ 'profile.email': profile.email }).lean().exec();
    
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

    return user;
}