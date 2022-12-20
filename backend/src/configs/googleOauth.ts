import passport from 'passport';

var GoogleStrategy = require('passport-google-oauth20').Strategy;

type GoogleUser = {
    id: string;
}

// Google oauth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.HOST}/auth/google/callback`,
    
},
    function (accessToken: string, refreshToken: string, profile: any, cb: any) {
        console.log(accessToken, refreshToken, profile);
        console.log('hello')

        return cb(null, profile);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user!);
});