const {
    saveForm,
    getForms,
    removeForm,
    renameForm,
    publishForm,
    fetchRecentForms,
    updateForm,
    fetchFormsPics,
} = require('../services/user_service');
const { STATUS_CODES } = require(process.cwd() + '/src/utils/constants');

const createForm = async (req, res) => {
    try {
        const createdAt = new Date();
        const updatedAt = new Date();
        const message = req.body.form.status === 'draft' ? ' saved as draft successfully' : ' published successfully';
        const savedForm = await saveForm({ userId: req.user._id, ...req.body.form, createdAt, updatedAt });
        res.status(STATUS_CODES.CREATED).json({
            message,
            form: savedForm,
            statusCode: STATUS_CODES.CREATED,
        });
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            message: 'Error saving the form',
            error: error.message,
            statusCode: STATUS_CODES.BAD_REQUEST,
        });
    }
};

const getAllForms = async (req, res) => {
    try {
        const docs = await getForms(req.user._id);
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
            message: 'Error retreiving the forms',
            error: error.message,
            statusCode: STATUS_CODES.BAD_REQUEST,
        });
    }
};

const deleteForm = async (req, res) => {
    try {
        const { id } = req.params;
        await removeForm(id);
        res.status(STATUS_CODES.OK).json({
            message: 'Form removed successfully',
            statusCode: STATUS_CODES.OK,
        });
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            message: 'Error removing the form',
            error: error.message,
            statusCode: STATUS_CODES.BAD_REQUEST,
        });
    }
};

const updateFormTitle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        await renameForm(id, title);
        res.status(STATUS_CODES.OK).json({
            message: 'Renamed successfully',
            statusCode: STATUS_CODES.OK,
        });
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            message: 'Error renaming the form',
            error: error.message,
            statusCode: STATUS_CODES.BAD_REQUEST,
        });
    }
};

const updateFormStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await publishForm(id, status);
        res.status(STATUS_CODES.OK).json({
            message: 'Published successfully',
            statusCode: STATUS_CODES.OK,
        });
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            message: 'Error publishing the form',
            error: error.message,
            statusCode: STATUS_CODES.BAD_REQUEST,
        });
    }
};

const editForm = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAt = new Date();
        await updateForm(id, { ...req.body.form, updatedAt });
        res.status(STATUS_CODES.OK).json({
            message: 'updated successfully',
            statusCode: STATUS_CODES.OK,
        });
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            message: 'Error updating the form',
            error: error.message,
            statusCode: STATUS_CODES.BAD_REQUEST,
        });
    }
};

const getRecentForms = async (req, res) => {
    try {
        const forms = await fetchRecentForms();
        res.status(STATUS_CODES.OK).json({
            forms,
            statusCode: STATUS_CODES.OK,
        });
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            message: 'Error fetching the forms',
            error: error.message,
            statusCode: STATUS_CODES.BAD_REQUEST,
        });
    }
};

const fetchFormsImages = async (req, res) => {
    try {
        const forms = await fetchFormsPics();
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
            message: 'Error fetching the forms images',
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
