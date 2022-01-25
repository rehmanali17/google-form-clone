const passport = require('passport');
require('../passport-setup/setup');

class AuthMiddleware {
    // Google Authentication Middleware
    static googleAuthentication(req, res, next) {
        try {
            passport.authenticate('oauth', { scope: ['profile', 'email'] }, (error, user, info) => {
                if (error) {
                    res.status(401).json({
                        message: info.message,
                        error: info.error,
                        statusCode: 400,
                    });
                } else {
                    next();
                }
            })(req, res, next);
        } catch (error) {
            res.status(400).json({
                message: 'Google Authentication error',
                error: error.message,
                statusCode: 400,
            });
        }
    }

    // Validate Token Middleware || Route Protection Middleware
    static jwtAuthentication = (req, res, next) => {
        passport.authenticate('jwt', (err, user, info) => {
            if (err || !user) {
                res.status(401).json({
                    message: 'User is not authorized',
                    error: 'Token is expired',
                    statusCode: 400,
                });
            } else {
                req.user = user;
                next();
            }
        })(req, res, next);
    };
}

module.exports = AuthMiddleware;
