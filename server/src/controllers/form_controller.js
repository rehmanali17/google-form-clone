const Form = require('../models/Form');
const { STATUS_CODES, ALERTS } = require('../constants');

const getForm = async (req, res) => {
    try {
        const { id } = req.params;
        const form = await Form.findById(id).select(['-__v', '-imageString', '-createdAt', '-updatedAt']);
        res.status(STATUS_CODES.OK).json({
            form,
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

module.exports = { getForm };
