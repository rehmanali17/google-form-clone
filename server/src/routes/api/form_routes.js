const router = require('express').Router();
const { getForm } = require(process.cwd() + '/src/controllers/form_controller');

router.get('/get-form/:id', getForm);

module.exports = router;
