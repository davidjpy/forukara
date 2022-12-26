import passport from 'passport';
var GoogleStrategy = require('passport-google-oauth20').Strategy;

import { IUser } from '@utilities/types';
import User from '@models/User';

type GoogleProfile = {
    _json: Profile
};

type Profile = {
    email: string;
    name: string;
    picture: string;
};

// Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.HOST}/auth/google/callback`,
},
    async function verify(accessToken: string, refreshToken: string, profile: GoogleProfile, cb: any) {

        // Check for any matches for Google email
        let existingUser = await User.findOne({ email: profile._json.email }).lean().exec();

        // Case 1: Not an existing user
        if (!existingUser) {
            const userObj: IUser = {
                username: profile._json.name.trim(),
                email: profile._json.email,
                avatar: profile._json.picture,
                status: 'Active',
                expiredIn: null
            };

            existingUser = await User.create(userObj);
        }
    
        cb(null, existingUser, null);
    }
));