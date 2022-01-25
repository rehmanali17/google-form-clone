const router = require('express').Router();
const AuthMiddleware = require('../../middleware/auth.middleware');
const passport = require('passport');
const AuthController = require('../../controllers/auth.contoller');
require('../../passport-setup/setup');

router.get('/google', AuthMiddleware.googleAuthentication);

router.get('/google/redirect', passport.authenticate('oauth'), AuthController.googleLogin);

// To test route protection strategy
router.get('/test-route', AuthMiddleware.jwtAuthentication, (req, res) => {
    res.json(req.user);
});

module.exports = router;
