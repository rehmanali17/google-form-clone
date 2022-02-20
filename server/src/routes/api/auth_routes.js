const router = require('express').Router();
const { googleAuthentication } = require('../../middleware/auth_middleware');
const passport = require('passport');
const { googleLogin } = require('../../controllers/auth_contoller');
require('../../config/passport_setup');

router.get('/google', googleAuthentication);

router.get('/google/redirect', passport.authenticate('oauth'), googleLogin);

module.exports = router;
