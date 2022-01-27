const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: String,
    type: String,
    options: [String],
    isRequired: Boolean,
});

const formSchema = new Schema({
    title: String,
    description: String,
    status: String,
    questions: {
        type: [questionSchema],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
});

module.exports = mongoose.model('Form', formSchema, 'forms');
