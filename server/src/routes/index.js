const router = require('express').Router();
const authRoutes = require('./api/auth.routes');
const Form = require('../models/Form');

router.post('/add-form', (req, res) => {
    console.log(req.body);
    const form = new Form(req.body);
    form.save()
        .then((formDoc) => {
            res.json({ form: formDoc });
        })
        .catch((err) => {
            res.json({ error: err.message });
        });
});

router.post('/add-more-questions', (req, res) => {
    Form.updateOne({ _id: req.body.id }, { $push: { questions: req.body.questions } })
        .then((formDoc) => {
            res.json({ form: formDoc });
        })
        .catch((err) => {
            res.json({ error: err.message });
        });
});

router.post('/update-form', (req, res) => {
    console.log(req.body);
    Form.updateOne({ _id: req.body.id }, { questions: req.body.questions })
        .then((formDoc) => {
            res.json({ form: formDoc });
        })
        .catch((err) => {
            res.json({ error: err.message });
        });
});

router.get('/all-forms', (req, res) => {
    Form.find()
        .then((forms) => {
            res.json(forms);
        })
        .catch((err) => {
            res.json({ error: err.message });
        });
});

router.use('/auth', authRoutes);

module.exports = router;
