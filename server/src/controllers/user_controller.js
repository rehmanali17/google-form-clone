const Form = require('../models/Form');
const { STATUS_CODES, ALERTS } = require('../constants');
const { successResponse, failedResponse } = require('../services/response_service');

const createForm = async (req, res) => {
    try {
        const message = req.body.form.status === 'draft' ? ' saved as draft successfully' : ' published successfully';
        const form = new Form({ userId: req.user._id, ...req.body.form });
        const savedForm = await form.save();
        successResponse(res, { form: savedForm }, STATUS_CODES.CREATED, message);
    } catch (error) {
        failedResponse(res, error.message, ALERTS.ERROR_SAVING_FORM, STATUS_CODES.BAD_REQUEST);
    }
};

const getAllForms = async (req, res) => {
    try {
        const docs = await Form.find({ userId: req.user._id }).select(['-__v', '-imageString']);
        const forms = docs.map((doc) => {
            return {
                ...doc._doc,
                imageString: '',
            };
        });
        successResponse(res, { forms }, STATUS_CODES.OK);
    } catch (error) {
        failedResponse(res, error.message, ALERTS.FORM_FETCH_ERROR, STATUS_CODES.BAD_REQUEST);
    }
};

const deleteForm = async (req, res) => {
    try {
        const { id } = req.params;
        await Form.deleteOne({ id });
        successResponse(res, {}, STATUS_CODES.OK, ALERTS.FORM_REMOVE_SUCCESS);
    } catch (error) {
        failedResponse(res, error.message, ALERTS.FORM_REMOVE_FAIL, STATUS_CODES.BAD_REQUEST);
    }
};

const updateFormTitle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        await Form.findByIdAndUpdate(id, { title }, { timestamps: { createdAt: false, updatedAt: true } });
        successResponse(res, {}, STATUS_CODES.OK, ALERTS.FORM_RENAME_SUCCESS);
    } catch (error) {
        failedResponse(res, error.message, ALERTS.FORM_RENAME_FAIL, STATUS_CODES.BAD_REQUEST);
    }
};

const updateFormStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await Form.findByIdAndUpdate(id, { status }, { timestamps: { createdAt: false, updatedAt: true } });
        successResponse(res, {}, STATUS_CODES.OK, ALERTS.FORM_STATUS_UPDATE_SUCCESS);
    } catch (error) {
        failedResponse(res, error.message, ALERTS.FORM_STATUS_UPDATE_FAIL, STATUS_CODES.BAD_REQUEST);
    }
};

const editForm = async (req, res) => {
    try {
        const { id } = req.params;
        await Form.findByIdAndUpdate(id, { ...req.body.form }, { timestamps: { createdAt: false, updatedAt: true } });
        successResponse(res, {}, STATUS_CODES.OK, ALERTS.FORM_EDIT_SUCCESS);
    } catch (error) {
        failedResponse(res, error.message, ALERTS.FORM_EDIT_FAIL, STATUS_CODES.BAD_REQUEST);
    }
};

const getRecentForms = async (req, res) => {
    try {
        const forms = await Form.aggregate([
            { $project: { _id: 1, imageString: 1, title: 1 } },
            {
                $sort: { updatedAt: -1 },
            },
            { $limit: 5 },
        ]);
        successResponse(res, { forms }, STATUS_CODES.OK);
    } catch (error) {
        failedResponse(res, error.message, ALERTS.FORM_FETCH_ERROR, STATUS_CODES.BAD_REQUEST);
    }
};

const fetchFormsImages = async (req, res) => {
    try {
        const forms = await Form.find().select(['_id', 'imageString']);
        let formImages = {};
        forms.forEach((form) => {
            formImages = {
                ...formImages,
                [form['_id']]: form.imageString,
            };
        });
        successResponse(res, { formImages }, STATUS_CODES.OK);
    } catch (error) {
        failedResponse(res, error.message, ALERTS.FORM_IMAGES_FETCH_ERROR, STATUS_CODES.BAD_REQUEST);
    }
};

module.exports = {
    createForm,
    getAllForms,
    deleteForm,
    updateFormTitle,
    updateFormStatus,
    getRecentForms,
    editForm,
    fetchFormsImages,
};
