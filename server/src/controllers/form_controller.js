const { fetchSingleForm } = require(process.cwd() + '/src/services/form_service');
const { STATUS_CODES } = require(process.cwd() + '/src/utils/constants');

const getForm = async (req, res) => {
    try {
        const { id } = req.params;
        const form = await fetchSingleForm(id);
        res.status(STATUS_CODES.OK).json({
            form,
            statusCode: STATUS_CODES.OK,
        });
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            message: 'Error retreiving the form',
            error: error.message,
            statusCode: STATUS_CODES.BAD_REQUEST,
        });
    }
};

module.exports = { getForm };
