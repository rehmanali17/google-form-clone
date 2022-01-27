const router = require('express').Router();
const { googleAuthentication, jwtAuthentication } = require('../../middleware/auth.middleware');
const passport = require('passport');
const { googleLogin } = require('../../controllers/auth.contoller');
require('../../config/passport-setup');

router.get('/google', googleAuthentication);

router.get('/google/redirect', passport.authenticate('oauth'), googleLogin);

// To test route protection strategy
router.get('/test-route', jwtAuthentication, (req, res) => {
    res.json(req.user);
});

module.exports = router;
