const { saveUser, validateUser } = require(process.cwd() + '/src/services/auth_service');

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
