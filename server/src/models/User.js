const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    pictureURL: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

module.exports = mongoose.model("User", userSchema, "users");
