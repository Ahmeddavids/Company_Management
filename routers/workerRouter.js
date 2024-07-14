const express = require('express');
const { employeeSignUp, employeeLogin, getEmployeeById, getAllEmployeesAndTotalSalaries } = require('../controllers/workerController');
const { authenticate } = require('../middleware/authorization');

const router = express.Router();

router.post('/sign-up/:userId', authenticate, employeeSignUp);

router.post('/sign-in', employeeLogin);

router.get('/get-one/:employeeId', getEmployeeById);

router.get('/get-all-employees/:userId', authenticate, getEmployeeById);

router.get('/get-total', getAllEmployeesAndTotalSalaries);

module.exports = router;
