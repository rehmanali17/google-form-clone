const router = require('express').Router();
const authRoutes = require(process.cwd() + '/src/routes/api/auth_routes');
const userRoutes = require(process.cwd() + '/src/routes/api/user_routes');
const formRoutes = require(process.cwd() + '/src/routes/api/form_routes');
const { jwtAuthentication } = require(process.cwd() + '/src/middleware/auth_middleware');

router.use('/auth', authRoutes);
router.use('/user', jwtAuthentication, userRoutes);
router.use('/form', formRoutes);

module.exports = router;
