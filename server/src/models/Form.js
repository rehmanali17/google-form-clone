const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ALERTS } = require('../constants');

const questionSchema = new Schema({
    question: {
        type: String,
        required: [true, ALERTS.FORM_SCHEMA.QUESTION],
    },
    type: {
        type: String,
        required: [true, ALERTS.FORM_SCHEMA.TYPE],
        enum: ['short', 'long', 'multiple-choice'],
    },
    options: [String],
    isRequired: { type: Boolean, required: true },
});

const formSchema = new Schema(
    {
        userId: mongoose.Types.ObjectId,
        title: {
            type: String,
            required: [true, ALERTS.FORM_SCHEMA.TITLE.REQUIRED],
            validate: {
                validator: (title) => {
                    return /^[a-zA-Z _-]+$/.test(title);
                },
                message: () => ALERTS.FORM_SCHEMA.TITLE.VALID,
            },
        },
        description: {
            type: String,
            required: [true, ALERTS.FORM_SCHEMA.DESCRIPTION.REQUIRED],
            validate: {
                validator: (description) => {
                    return /^[a-zA-Z ._-]+$/.test(description);
                },
                message: () => ALERTS.FORM_SCHEMA.DESCRIPTION.VALID,
            },
        },
        status: { type: String, required: [true, ALERTS.FORM_SCHEMA.STATUS], enum: ['draft', 'published'] },
        imageString: String,
        questions: {
            type: [questionSchema],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Form', formSchema, 'forms');
