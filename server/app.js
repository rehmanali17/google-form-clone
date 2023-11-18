const express = require('express');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const routes = require(process.cwd() + '/src/routes/index');
const { dbConnection } = require(process.cwd() + '/src/config/connection');

const app = express();
app.use(cors());
app.use(passport.initialize());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public/dist/client')));

dbConnection(app);

app.use('/api', routes);
