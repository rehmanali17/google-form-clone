const Form = require('../models/Form');
const { STATUS_CODES, ALERTS } = require('../constants');
const { successResponse, failedResponse } = require('../services/response_service');

const getForm = async (req, res) => {
    try {
        const { id } = req.params;
        const form = await Form.findById(id).select(['-__v', '-imageString', '-createdAt', '-updatedAt']);
        successResponse(res, { form }, STATUS_CODES.OK);
    } catch (error) {
        failedResponse(res, error.message, ALERTS.FORM_FETCH_ERROR, STATUS_CODES.BAD_REQUEST);
    }
};

module.exports = { getForm };
