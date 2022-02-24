const successResponse = (res, data, status, message = '') => {
    res.status(status).json({ message, ...data, statusCode: status });
};

const failedResponse = (res, error, message = '', status) => {
    res.status(status).json({ message, error, statusCode: status });
};

module.exports = { successResponse, failedResponse };
