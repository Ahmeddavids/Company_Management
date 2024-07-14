const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateEmployed: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    },
    token: {
        type: String,
    },
    employer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    tasks: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Task'
    }],
}, { timestamps: true });

const workerModel = mongoose.model('Workers', workerSchema);

module.exports = workerModel