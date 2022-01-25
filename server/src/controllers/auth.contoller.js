const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthController {
    // Google Login Method
    static googleLogin = (req, res) => {
        try {
            const token = jwt.sign({ id: req.user._id }, process.env.jwtSecretKey, {
                expiresIn: '1h',
            });
            res.cookie(
                'payload',
                JSON.stringify({
                    user: req.user,
                    accessToken: `Bearer ${token}`,
                    statusCode: 200,
                })
            );
            // res.status(200).json({
            //     user: req.user,
            //     accessToken: `Bearer ${token}`,
            //     statusCode: 200,
            // });
            res.redirect('http://localhost:4200/user');
        } catch (error) {
            res.status(400).json({
                message: 'Google authorization failed',
                statusCode: 400,
            });
        }
    };
}

module.exports = AuthController;
