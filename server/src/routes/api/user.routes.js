const router = require('express').Router();
const {
    createForm,
    getAllForms,
    deleteForm,
    editForm,
    updateFormTitle,
    getRecentForms,
    updateFormStatus,
} = require('../../controllers/user.controller');

router.post('/create-form', createForm);

router.get('/get-all-forms', getAllForms);

router.get('/get-recent-forms', getRecentForms);

router.put('/edit-form/:id', editForm);

router.put('/update-form-title/:id', updateFormTitle);

router.put('/update-form-status/:id', updateFormStatus);

router.delete('/delete-form/:id', deleteForm);

module.exports = router;
