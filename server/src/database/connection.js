const mongoose = require('mongoose');
require('dotenv').config();
const { PROCESS_EXIT } = require('../utils/status-codes');

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
            process.exit(PROCESS_EXIT);
        });
};

module.exports = { dbConnection };
