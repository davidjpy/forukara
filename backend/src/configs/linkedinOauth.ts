import passport from 'passport';
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

import { IUser } from '@utilities/types';
import User from '@models/User';

type LinkedinProfile = {
    displayName: string;
    photos: Array<{ value: string; }>;
    emails: Array<{ value: string; }>;
}

// Linkedin OAuth Strategy
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: `${process.env.HOST}/auth/linkedin/callback`,
    scope: ['r_emailaddress', 'r_liteprofile'],
},
    async function (accessToken: string, refreshToken: string, profile: LinkedinProfile, done: any) {

        // Check for any matches for Linkedin email
        let existingUser = await User.findOne({ email: profile.emails[0].value }).lean().exec();

        // Case 1: Not an existing user
        if (!existingUser) {
            const userObj: IUser = {
                username: profile.displayName.trim(),
                email: profile.emails[0].value,
                avatar: profile.photos[0].value,
                status: 'Active',
                expiredIn: null
            };

            existingUser = await User.create(userObj);
        }

        process.nextTick(function () {
            return done(null, existingUser, null);
        });
    }));