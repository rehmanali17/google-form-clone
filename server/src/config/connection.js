const mongoose = require('mongoose');
const { STATUS_CODES } = require('../utils/constants');
require('dotenv').config();

const mongoURi = process.env.mongoURi;
const PORT = process.env.PORT;

const dbConnection = (app) => {
    mongoose
        .connect(mongoURi, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('Database connected');
            app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
        })
        .catch((error) => {
            console.log(error.message);
            process.exit(STATUS_CODES.PROCESS_EXIT);
        });
};

module.exports = { dbConnection };
