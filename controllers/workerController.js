require('dotenv').config();
const { sendEmail } = require('../middleware/sendMail');
const HRModel = require('../models/userModel');
const workerModel = require('../models/workerModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordGenerator = require('otp-generator');
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
});


exports.employeeSignUp = async (req, res) => {
    try {
        const { userId } = req.user;
        const { fullName, role, salary, email, phoneNumber } = req.body;
        if (!email || !phoneNumber || !salary || !fullName || !role) {
            return res.status(400).json({
                message: `Please enter all details`
            })
        }
        const emailExists = await workerModel.findOne({ email: email.toLowerCase() })

        if (emailExists) {
            return res.status(400).json({
                message: `Employee already exist.`
            })
        }

        const HR = await HRModel.findById(userId)

        if (!HR) {
            return res.status(404).json({
                message: `Employer not found`
            })
        }

        // Generate Password
        const password = passwordGenerator.generate(8, {
            lowerCaseAlphabets: true,
            upperCaseAlphabets: true,
            specialChars: true,
        });
        console.log(password);

        // salt the password using bcrypt
        const salt = bcrypt.genSaltSync(10)
        // hash the salted password using bcrypt
        const hashedPassword = bcrypt.hashSync(password, salt);

        const worker = new workerModel({
            fullName,
            email: email.toLowerCase(),
            role,
            salary,
            phoneNumber,
            dateEmployed: formattedDate,
            employer: HR._id,
            password: hashedPassword
        })

        const token = jwt.sign({
            userId: worker._id,
            email: worker.email,
        },
            process.env.JWT_SECRET, { expiresIn: "2hrs" });

        worker.token = token;

        const mailOptions = {
            email: worker.email,
            subject: "Verify your account",
            html: `Hi: ${worker.fullName}, Welcome onboard. Here is your login details: Email: ${worker.email} Password: ${password}`,
        };

        // save the worker
        await worker.save();
        await sendEmail(mailOptions);

        // return a response
        res.status(201).json({
            message: `Created succefully, employee should check their email for login details.`,
            data: worker
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.employeeLogin = async (req, res) => {
    try {
        // Extract the user's email and password
        const { password, email } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: `Please enter all details`
            })
        }
        // find user by their registered email or username
        const checkUser = await workerModel.findOne({ email: email.toLowerCase() })

        // check if the user exists
        if (!checkUser) {
            return res.status(404).json({
                Failed: 'User not found'
            })
        }

        // Compare user's password with the saved password.
        const checkPassword = bcrypt.compareSync(password, checkUser.password)
        // Check for password error
        if (!checkPassword) {
            return res.status(404).json({
                message: 'Invalid password'
            })
        }

        const token = jwt.sign({
            userId: checkUser._id,
            email: checkUser.email,

        },
            process.env.JWT_SECRET, { expiresIn: "2hrs" })

        checkUser.token = token

        checkUser.save()

        res.status(200).json({
            message: 'Login successful',
            data: checkUser

        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.getEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        const employee = await workerModel.findById(employeeId).populate('tasks');

        if (!employee) {
            return res.status(404).json({
                message: `Employee not found`
            });
        }

        res.status(200).json({
            message: `Employee retrieved successfully`,
            data: employee
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getAllEmployeesByHR = async (req, res) => {
    try {
        const HRId = req.params.userId;
        const employees = await workerModel.find({ employer: HRId });

        if (employees.length === 0) {
            return res.status(404).json({
                message: `No employees found for HR with ID ${HRId}`
            });
        }

        res.status(200).json({
            message: `Employees retrieved successfully`,
            data: employees
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getAllEmployeesAndTotalSalaries = async (req, res) => {
    try {
        const employees = await workerModel.find();

        if (employees.length === 0) {
            return res.status(404).json({
                message: `No employees found`
            });
        }

        const totalSalaries = employees.reduce((acc, employee) => acc + employee.salary, 0);

        res.status(200).json({
            message: `Employees retrieved successfully`,
            data: employees,
            totalEmployees: employees.length,
            totalSalaries
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
