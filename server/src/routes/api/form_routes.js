const router = require('express').Router();
const { getForm } = require('../../controllers/form_controller');

router.get('/get-form/:id', getForm);

module.exports = router;
