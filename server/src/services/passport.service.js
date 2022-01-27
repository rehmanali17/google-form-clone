const { saveUser, validateUser } = require('../services/auth.service');

const handleGoogleStrategy = (accessToken, refreshToken, profile, done) => {
    const authenticatedUser = {
        name: profile._json.name,
        email: profile._json.email,
        pictureURL: profile._json.picture,
    };
    saveUser(authenticatedUser, done);
};

const handleJWTStrategy = (token, done) => {
    validateUser(token, done);
};

module.exports = { handleGoogleStrategy, handleJWTStrategy };
