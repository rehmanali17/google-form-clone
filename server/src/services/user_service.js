const Form = require('../models/Form');

const saveForm = (payload) => {
    const form = new Form(payload);
    return form.save();
};

const getForms = (userId) => {
    return Form.find({ userId }).select(['-__v', '-imageString']);
};

const removeForm = (formId) => {
    return Form.deleteOne({ id: formId });
};

const renameForm = (formId, title) => {
    const updatedAt = new Date();
    return Form.findByIdAndUpdate(formId, { title, updatedAt });
};

const publishForm = (formId, status) => {
    const updatedAt = new Date();
    return Form.findByIdAndUpdate(formId, { status, updatedAt });
};

const updateForm = (formId, form) => {
    return Form.findByIdAndUpdate(formId, { ...form });
};

const fetchRecentForms = () => {
    return Form.aggregate([
        { $project: { _id: 1, imageString: 1, title: 1 } },
        {
            $sort: { updatedAt: -1 },
        },
        { $limit: 5 },
    ]);
};

module.exports = {
    saveForm,
    getForms,
    removeForm,
    renameForm,
    publishForm,
    fetchRecentForms,
    updateForm,
};
