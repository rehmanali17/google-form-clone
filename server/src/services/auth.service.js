const User = require('../models/User');

class AuthService {
    // Google Authenticatation Service
    static googleAuthentication = async (authenticatedUser, done) => {
        try {
            // Checking user in the database
            const existingUser = await User.findOne({
                email: authenticatedUser.email,
            }).select('-__v');
            // User does not exist already in the database
            if (existingUser === null) {
                const newUser = new User(authenticatedUser);
                newUser
                    .save()
                    .then((user) => {
                        done(null, user);
                    })
                    .catch((error) => {
                        done(error, false, {
                            message: 'Error while adding the user in the database',
                            error: error.message,
                        });
                    });
            } else {
                // If the user exists in the database
                done(null, existingUser);
            }
        } catch (error) {
            done(error, false, {
                message: 'An unknown error occured',
                error: error.message,
            });
        }
    };

    // Jwt Authenticatation Service
    static jwtAuthentication = async ({ id }, done) => {
        try {
            // Checking user in the database
            const user = await User.findById(id).select('-__v');
            console.log(user);
            // User does not exist already in the database
            if (user === null) {
                done(null, false, {
                    message: 'User does not exist',
                    statudCode: 401,
                });
            } else {
                // If the user exists in the database
                done(null, user);
            }
        } catch (error) {
            done(error, false, {
                message: 'An unknown error occured',
                error: error.message,
            });
        }
    };
}

module.exports = AuthService;
