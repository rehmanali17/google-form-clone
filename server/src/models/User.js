const mongoose = require('mongoose');
const { ALERTS } = require('../constants');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, ALERTS.USER_SCHEMA.NAME],
        },
        email: {
            type: String,
            required: [true, ALERTS.USER_SCHEMA.EMAIL],
        },
        pictureURL: {
            type: String,
            required: [true, ALERTS.USER_SCHEMA.PICTURE_URL],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema, 'users');
