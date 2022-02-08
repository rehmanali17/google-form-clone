const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();
const { handleGoogleStrategy, handleJWTStrategy } = require('../services/passport_service');

passport.serializeUser((user, done) => {
    done(null, user);
});

// OAuth Strategy
passport.use(
    'oauth',
    new GoogleStrategy(
        {
            clientID: process.env.clientID,
            clientSecret: process.env.clientSecret,
            callbackURL: process.env.callbackURL,
        },
        handleGoogleStrategy
    )
);

// Route Protection Strategy
passport.use(
    'jwt',
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.jwtSecretKey,
        },
        handleJWTStrategy
    )
);
