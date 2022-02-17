const User = require(process.cwd() + '/src/models/User');
const { STATUS_CODES } = require(process.cwd() + '/src/utils/constants');

// Google Authenticatation Service
const saveUser = async (authenticatedUser, done) => {
    try {
        const existingUser = await User.findOne({
            email: authenticatedUser.email,
        }).select('-__v');
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
const validateUser = async ({ id }, done) => {
    try {
        const user = await User.findById(id).select('-__v');
        if (user === null) {
            done(null, false, {
                message: 'User does not exist',
                statudCode: STATUS_CODES.NOT_FOUND,
            });
        } else {
            done(null, user);
        }
    } catch (error) {
        done(error, false, {
            message: 'An unknown error occured',
            error: error.message,
        });
    }
};

module.exports = { saveUser, validateUser };
