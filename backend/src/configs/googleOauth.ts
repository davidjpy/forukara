import passport from 'passport';

var GoogleStrategy = require('passport-google-oauth20').Strategy;


// Google oauth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.HOST}/auth/google/callback`,
},
    async function verify(accessToken: string, refreshToken: string, profile: unknown, cb: any) {
        return cb(null, profile, null);
    }
));

// passport.serializeUser(function(user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//     done(null, user!);
// });