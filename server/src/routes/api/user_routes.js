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
} = require(process.cwd() + '/src/controllers/user_controller');

router.post('/create-form', createForm);

router.get('/get-all-forms', getAllForms);

router.get('/get-forms-pics', fetchFormsImages);

router.get('/get-recent-forms', getRecentForms);

router.put('/edit-form/:id', editForm);

router.patch('/update-form-title/:id', updateFormTitle);

router.patch('/update-form-status/:id', updateFormStatus);

router.delete('/delete-form/:id', deleteForm);

module.exports = router;
