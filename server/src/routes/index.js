const router = require('express').Router();
const authRoutes = require('./api/auth_routes');
const userRoutes = require('./api/user_routes');
const formRoutes = require('./api/form_routes');
const { jwtAuthentication } = require('../middleware/auth_middleware');

router.use('/auth', authRoutes);
router.use('/user', jwtAuthentication, userRoutes);
router.use('/form', formRoutes);

module.exports = router;
