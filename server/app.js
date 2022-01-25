const express = require('express');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const routes = require('./src/routes/index');
const dbConnection = require('./src/database/connection');

const app = express();
app.use(cors());
app.use(passport.initialize());
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public/dist/client')));

const PORT = process.env.PORT;
dbConnection
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
    })
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    });
app.get('/test', (req, res) => {
    res.json({ msg: 'Success' });
});
app.use('/api', routes);
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/dist/client/index.html'));
// });
