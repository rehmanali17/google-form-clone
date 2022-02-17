const router = require('express').Router();
const { googleAuthentication } = require(process.cwd() + '/src/middleware/auth_middleware');
const passport = require('passport');
const { googleLogin } = require(process.cwd() + '/src/controllers/auth_contoller');
require(process.cwd() + '/src/config/passport_setup');

router.get('/google', googleAuthentication);

router.get('/google/redirect', passport.authenticate('oauth'), googleLogin);

module.exports = router;
