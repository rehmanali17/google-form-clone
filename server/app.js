const express = require('express');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const routes = require('./src/routes/index');
const { dbConnection } = require('./src/database/connection');

const app = express();
app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public/dist/client')));

dbConnection(app);

app.use('/api', routes);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/dist/client/index.html'));
// });
