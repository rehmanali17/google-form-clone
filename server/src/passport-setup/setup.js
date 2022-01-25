const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();
const AuthService = require('../services/auth.service');

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
        (accessToken, refreshToken, profile, done) => {
            const authenticatedUser = {
                name: profile._json.name,
                email: profile._json.email,
                pictureURL: profile._json.picture,
            };
            AuthService.googleAuthentication(authenticatedUser, done);
        }
    )
);

// Route Protection Strategy
const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('JWT');
options.secretOrKey = process.env.PORT;
passport.use(
    'jwt',
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('JWT'),
            secretOrKey: process.env.jwtSecretKey,
        },
        (token, done) => {
            AuthService.jwtAuthentication(token, done);
        }
    )
);
