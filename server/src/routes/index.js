const router = require('express').Router();
const authRoutes = require('./api/auth.routes');
const userRoutes = require('./api/user.routes');
const Form = require('../models/Form');
const { jwtAuthentication } = require('../middleware/auth.middleware');

router.use('/auth', authRoutes);
router.use('/user', jwtAuthentication, userRoutes);

module.exports = router;
