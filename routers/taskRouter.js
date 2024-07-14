const express = require('express');
const { checkUser, authentication } = require('../middleware/authorization');
const { createTask, updateTaskStatusToSuccess, getTaskById, getTasksByEmployeeId } = require('../controllers/taskController');


const router = express.Router();

router.post('/create/:adminId/:employeeId', authentication, createTask);

router.put('/completed/:taskId', updateTaskStatusToSuccess );

router.get('/get-one/:taskId', getTaskById); 

router.get('/all-employee-tasks/:employeeId', getTasksByEmployeeId);

module.exports = router;
