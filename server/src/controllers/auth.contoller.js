const jwt = require('jsonwebtoken');
require('dotenv').config();
const { BAD_REQUEST, OK } = require('../utils/status-codes');
const { baseURL } = require('../utils/base-url');

const googleLogin = (req, res) => {
    try {
        const token = jwt.sign({ id: req.user._id }, process.env.jwtSecretKey, {
            expiresIn: '1h',
        });
        res.cookie(
            'payload',
            JSON.stringify({
                user: req.user,
                accessToken: `Bearer ${token}`,
                statusCode: OK,
            })
        );
        res.redirect(`${baseURL}/user`);
    } catch (error) {
        res.status(BAD_REQUEST).json({
            message: 'Google authorization failed',
            statusCode: BAD_REQUEST,
        });
    }
};

module.exports = { googleLogin };
