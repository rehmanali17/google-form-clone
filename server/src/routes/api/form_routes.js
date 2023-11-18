const router = require('express').Router();
const { getForm } = require('../../controllers/form_controller');

router.get('/:id', getForm);

module.exports = router;
