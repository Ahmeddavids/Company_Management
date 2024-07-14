const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    },
    employeeRole: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Success'],
        default: 'Pending'
    },
    employeeId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Workers',
        required: true
    },
}, { timestamps: true });

const taskModel = mongoose.model('Task', taskSchema);

module.exports = taskModel