const HRModel = require('../models/userModel');
const workerModel = require('../models/workerModel');
const taskModel = require('../models/taskModel');

exports.createTask = async (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        const { task } = req.body;
        const employee = await workerModel.findById(employeeId);

        if (!employee) {
            return res.status(404).json({
                message: `Employee not found`
            });
        }

        const newTask = new taskModel({
            employeeName: employee.fullName,
            employeeRole: employee.role,
            employeeId: employee._id,
            task
        });

        employee.tasks.push(newTask._id);
        await newTask.save();
        await employee.save();

        res.status(201).json({
            message: `Task created successfully`,
            data: newTask
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getTasksByEmployeeId = async (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        const tasks = await taskModel.find({ employeeId });

        if (tasks.length === 0) {
            return res.status(404).json({
                message: `No tasks found for employee with ID ${employeeId}`
            });
        }

        res.status(200).json({
            message: `Tasks retrieved successfully`,
            data: tasks
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await taskModel.findById(taskId);

        if (!task) {
            return res.status(404).json({
                message: `Task not found`
            });
        }

        res.status(200).json({
            message: `Task retrieved successfully`,
            data: task
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateTaskStatusToSuccess = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await taskModel.findById(taskId);

        if (!task) {
            return res.status(404).json({
                message: `Task not found`
            });
        }

        task.status = 'Success';
        await task.save();

        res.status(200).json({
            message: `Task status updated to Success`,
            data: task
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
