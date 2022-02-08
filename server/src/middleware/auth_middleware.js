const passport = require('passport');
const { STATUS_CODES } = require('../utils/constants');
require('../config/passport_setup');

// Google Authentication Middleware
const googleAuthentication = (req, res, next) => {
    try {
        passport.authenticate('oauth', { scope: ['profile', 'email'] }, (error, user, info) => {
            if (error) {
                res.status(STATUS_CODES.UNAUTHORIZED).json({
                    message: info.message,
                    error: info.error,
                    statusCode: STATUS_CODES.BAD_REQUEST,
                });
            } else {
                next();
            }
        })(req, res, next);
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            message: 'Google Authentication error',
            error: error.message,
            statusCode: STATUS_CODES.BAD_REQUEST,
        });
    }
};

// Validate Token Middleware || Route Protection Middleware
const jwtAuthentication = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if (err || !user) {
            res.status(STATUS_CODES.UNAUTHORIZED).json({
                message: 'User is not authorized',
                error: 'Token is expired',
                statusCode: STATUS_CODES.BAD_REQUEST,
            });
        } else {
            req.user = user;
            next();
        }
    })(req, res, next);
};

module.exports = { googleAuthentication, jwtAuthentication };
