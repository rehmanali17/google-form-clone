const { BAD_REQUEST, CREATED, OK } = require('../utils/status-codes');
const {
    saveForm,
    getForms,
    removeForm,
    renameForm,
    publishForm,
    fetchRecentForms,
} = require('../services/user.service');

const createForm = (req, res) => {
    try {
        const createdAt = new Date();
        const updatedAt = new Date();
        const message =
            req.body.form.status === 'draft' ? 'Form saved as draft successfully' : 'Form published successfully';
        saveForm({ userId: req.user._id, ...req.body.form, createdAt, updatedAt })
            .then((savedForm) => {
                res.status(CREATED).json({
                    message,
                    form: savedForm,
                    statusCode: CREATED,
                });
            })
            .catch((err) => {
                res.status(BAD_REQUEST).json({
                    message: 'Error saving the form',
                    error: err.message,
                    statusCode: BAD_REQUEST,
                });
            });
    } catch (error) {
        res.status(BAD_REQUEST).json({
            message: 'Error saving the form',
            error: error.message,
            statusCode: BAD_REQUEST,
        });
    }
};

const getAllForms = (req, res) => {
    try {
        getForms(req.user._id)
            .then((forms) => {
                res.status(OK).json({
                    forms,
                    statusCode: OK,
                });
            })
            .catch((err) => {
                res.status(BAD_REQUEST).json({
                    message: 'Error retreiving the forms',
                    error: err.message,
                    statusCode: BAD_REQUEST,
                });
            });
    } catch (error) {
        res.status(BAD_REQUEST).json({
            message: 'Error retreiving the forms',
            error: error.message,
            statusCode: BAD_REQUEST,
        });
    }
};

const deleteForm = (req, res) => {
    try {
        const { id } = req.params;
        removeForm(id)
            .then(() => {
                res.status(OK).json({
                    message: 'Form removed successfully',
                    statusCode: OK,
                });
            })
            .catch((err) => {
                res.status(BAD_REQUEST).json({
                    message: 'Error removing the form',
                    error: err.message,
                    statusCode: BAD_REQUEST,
                });
            });
    } catch (error) {
        res.status(BAD_REQUEST).json({
            message: 'Error removing the form',
            error: error.message,
            statusCode: BAD_REQUEST,
        });
    }
};

const updateFormTitle = (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        renameForm(id, title)
            .then(() => {
                res.status(OK).json({
                    message: 'Renamed successfully',
                    statusCode: OK,
                });
            })
            .catch((err) => {
                res.status(BAD_REQUEST).json({
                    message: 'Error renaming the form',
                    error: err.message,
                    statusCode: BAD_REQUEST,
                });
            });
    } catch (error) {
        res.status(BAD_REQUEST).json({
            message: 'Error renaming the form',
            error: error.message,
            statusCode: BAD_REQUEST,
        });
    }
};

const updateFormStatus = (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        publishForm(id, status)
            .then(() => {
                res.status(OK).json({
                    message: 'Published successfully',
                    statusCode: OK,
                });
            })
            .catch((err) => {
                res.status(BAD_REQUEST).json({
                    message: 'Error publishing the form',
                    error: err.message,
                    statusCode: BAD_REQUEST,
                });
            });
    } catch (error) {
        res.status(BAD_REQUEST).json({
            message: 'Error publishing the form',
            error: error.message,
            statusCode: BAD_REQUEST,
        });
    }
};

const getRecentForms = (req, res) => {
    try {
        fetchRecentForms()
            .then((forms) => {
                res.status(OK).json({
                    forms,
                    statusCode: OK,
                });
            })
            .catch((err) => {
                res.status(BAD_REQUEST).json({
                    message: 'Error fetching the forms',
                    error: err.message,
                    statusCode: BAD_REQUEST,
                });
            });
    } catch (error) {
        res.status(BAD_REQUEST).json({
            message: 'Error fetching the forms',
            error: error.message,
            statusCode: BAD_REQUEST,
        });
    }
};

module.exports = { createForm, getAllForms, deleteForm, updateFormTitle, updateFormStatus, getRecentForms };
