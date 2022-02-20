const jwt = require('jsonwebtoken');
require('dotenv').config();
const { STATUS_CODES, ALERTS } = require('../constants');

const googleLogin = (req, res) => {
    try {
        const token = jwt.sign({ id: req.user._id }, process.env.jwtSecretKey, {
            expiresIn: '1h',
        });
        res.cookie(
            'payload',
            JSON.stringify({
                user: req.user,
                accessToken: token,
                statusCode: STATUS_CODES.OK,
            })
        );
        res.redirect(`${process.env.baseURL}/user`);
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            message: ALERTS.AUTHORIZATION_FAILED,
            statusCode: STATUS_CODES.BAD_REQUEST,
        });
    }
};

module.exports = { googleLogin };
