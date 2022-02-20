const Form = require('../models/Form');
const { STATUS_CODES, ALERTS } = require('../constants');

const createForm = async (req, res) => {
    try {
        const message = req.body.form.status === 'draft' ? ' saved as draft successfully' : ' published successfully';
        const form = new Form({ userId: req.user._id, ...req.body.form });
        const savedForm = await form.save();
        res.status(STATUS_CODES.CREATED).json({
            message,
            form: savedForm,
            statusCode: STATUS_CODES.CREATED,
        });
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            message: ALERTS.ERROR_SAVING_FORM,
            error: error.message,
            statusCode: STATUS_CODES.BAD_REQUEST,
        });
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
        res.status(STATUS_CODES.OK).json({
            forms,
            statusCode: STATUS_CODES.OK,
        });
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            message: ALERTS.FORM_FETCH_ERROR,
            error: error.message,
            statusCode: STATUS_CODES.BAD_REQUEST,
        });
    }
};

const deleteForm = async (req, res) => {
    try {
        const { id } = req.params;
        await Form.deleteOne({ id });
        res.status(STATUS_CODES.OK).json({
            message: ALERTS.FORM_REMOVE_SUCCESS,
            statusCode: STATUS_CODES.OK,
        });
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            message: ALERTS.FORM_REMOVE_FAIL,
            error: error.message,
            statusCode: STATUS_CODES.BAD_REQUEST,
        });
    }
};

const updateFormTitle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        await Form.findByIdAndUpdate(id, { title }, { timestamps: { createdAt: false, updatedAt: true } });
        res.status(STATUS_CODES.OK).json({
            message: ALERTS.FORM_RENAME_SUCCESS,
            statusCode: STATUS_CODES.OK,
        });
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            message: ALERTS.FORM_RENAME_FAIL,
            error: error.message,
            statusCode: STATUS_CODES.BAD_REQUEST,
        });
    }
};

const updateFormStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await Form.findByIdAndUpdate(id, { status }, { timestamps: { createdAt: false, updatedAt: true } });
        res.status(STATUS_CODES.OK).json({
            message: ALERTS.FORM_STATUS_UPDATE_SUCCESS,
            statusCode: STATUS_CODES.OK,
        });
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            message: ALERTS.FORM_STATUS_UPDATE_FAIL,
            error: error.message,
            statusCode: STATUS_CODES.BAD_REQUEST,
        });
    }
};

const editForm = async (req, res) => {
    try {
        const { id } = req.params;
        await Form.findByIdAndUpdate(id, { ...req.body.form }, { timestamps: { createdAt: false, updatedAt: true } });
        res.status(STATUS_CODES.OK).json({
            message: ALERTS.FORM_EDIT_SUCCESS,
            statusCode: STATUS_CODES.OK,
        });
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            message: ALERTS.FORM_EDIT_FAIL,
            error: error.message,
            statusCode: STATUS_CODES.BAD_REQUEST,
        });
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
        res.status(STATUS_CODES.OK).json({
            forms,
            statusCode: STATUS_CODES.OK,
        });
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            message: ALERTS.FORM_FETCH_ERROR,
            error: error.message,
            statusCode: STATUS_CODES.BAD_REQUEST,
        });
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
        res.status(STATUS_CODES.OK).json({
            formImages,
            statusCode: STATUS_CODES.OK,
        });
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            message: ALERTS.FORM_IMAGES_FETCH_ERROR,
            error: error.message,
            statusCode: STATUS_CODES.BAD_REQUEST,
        });
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
