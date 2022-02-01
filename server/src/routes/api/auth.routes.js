const router = require('express').Router();
const { googleAuthentication } = require('../../middleware/auth.middleware');
const passport = require('passport');
const { googleLogin } = require('../../controllers/auth.contoller');
require('../../config/passport-setup');

router.get('/google', googleAuthentication);

router.get('/google/redirect', passport.authenticate('oauth'), googleLogin);

module.exports = router;
