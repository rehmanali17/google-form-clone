const router = require('express').Router();
const {
    createForm,
    getAllForms,
    deleteForm,
    editForm,
    updateFormTitle,
    getRecentForms,
    updateFormStatus,
    fetchFormsImages,
} = require('../../controllers/user_controller');

router.post('/', createForm);

router.get('/', getAllForms);

router.get('/pics', fetchFormsImages);

router.get('/recent', getRecentForms);

router.put('/:id', editForm);

router.patch('/:id/title', updateFormTitle);

router.patch('/:id/status', updateFormStatus);

router.delete('/:id', deleteForm);

module.exports = router;
