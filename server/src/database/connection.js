const mongoose = require("mongoose");
require("dotenv").config();
const mongoURi = process.env.mongoURi;

module.exports = mongoose.connect(mongoURi, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
