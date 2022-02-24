const passport = require('passport');
const { STATUS_CODES, ALERTS } = require('../constants');
const { failedResponse } = require('../services/response_service');
require('../config/passport_setup');

// Google Authentication Middleware
const googleAuthentication = (req, res, next) => {
    try {
        passport.authenticate('oauth', { scope: ['profile', 'email'] }, (error, user, info) => {
            if (error) {
                failedResponse(res, info.error, info.message, STATUS_CODES.BAD_REQUEST);
            } else {
                next();
            }
        })(req, res, next);
    } catch (error) {
        failedResponse(res, error.message, ALERTS.AUTHENTICATION_FAILED, STATUS_CODES.BAD_REQUEST);
    }
};

// Validate Token Middleware || Route Protection Middleware
const jwtAuthentication = (req, res, next) => {
    passport.authenticate('jwt', (err, user) => {
        if (err || !user) {
            failedResponse(res, ALERTS.EXPIRED_TOKEN, ALERTS.UNAUTHORIZED, STATUS_CODES.BAD_REQUEST);
        } else {
            req.user = user;
            next();
        }
    })(req, res, next);
};

module.exports = { googleAuthentication, jwtAuthentication };
