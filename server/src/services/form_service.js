const Form = require(process.cwd() + '/src/models/Form');

const fetchSingleForm = (id) => {
    return Form.findById(id).select(['-__v', '-imageString', '-createdAt', '-updatedAt']);
};

module.exports = { fetchSingleForm };
