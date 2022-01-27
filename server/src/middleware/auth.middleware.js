const passport = require('passport');
require('../config/passport-setup');
const { UNAUTHORIZED, BAD_REQUEST } = require('../utils/status-codes');

// Google Authentication Middleware
const googleAuthentication = (req, res, next) => {
    try {
        passport.authenticate('oauth', { scope: ['profile', 'email'] }, (error, user, info) => {
            if (error) {
                res.status(UNAUTHORIZED).json({
                    message: info.message,
                    error: info.error,
                    statusCode: BAD_REQUEST,
                });
            } else {
                next();
            }
        })(req, res, next);
    } catch (error) {
        res.status(BAD_REQUEST).json({
            message: 'Google Authentication error',
            error: error.message,
            statusCode: BAD_REQUEST,
        });
    }
};

// Validate Token Middleware || Route Protection Middleware
const jwtAuthentication = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if (err || !user) {
            res.status(UNAUTHORIZED).json({
                message: 'User is not authorized',
                error: 'Token is expired',
                statusCode: BAD_REQUEST,
            });
        } else {
            req.user = user;
            next();
        }
    })(req, res, next);
};

module.exports = { googleAuthentication, jwtAuthentication };
