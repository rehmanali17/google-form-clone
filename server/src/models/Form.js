const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: String,
    type: String,
    options: [String],
    isRequired: Boolean,
});

const formSchema = new Schema({
    userId: mongoose.Types.ObjectId,
    title: String,
    description: String,
    status: String,
    imageString: String,
    questions: {
        type: [questionSchema],
    },
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model('Form', formSchema, 'forms');
