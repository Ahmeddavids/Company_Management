require('dotenv').config();
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../middleware/sendMail');
const OTP = require('../models/otpModel');
const otpGenerator = require('otp-generator');
const { signUpTemplate, forgotPasswordTemplate } = require('../middleware/emailTemplate');
const workerModel = require('../models/workerModel');


// user sign up
exports.userSignUp = async (req, res) => {
    try {
        const { email, password, companyName, fullName } = req.body
        if (!email || !password || !companyName || !fullName) {
            return res.status(400).json({
                message: `Please enter all details`
            })
        }

        const emailExists = await userModel.findOne({ email: email.toLowerCase() })

        if (emailExists) {
            return res.status(400).json({
                message: `Email already exist.`
            })
        }

        // salt the password using bcrypt
        const salt = bcrypt.genSaltSync(10)
        // hash the salted password using bcrypt
        const hashedPassword = bcrypt.hashSync(password, salt);



        // create a user
        const user = new userModel({
            email,
            password: hashedPassword,
            companyName,
            fullName
        });

        // Generate OTP
        const otp = otpGenerator.generate(4, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        console.log(otp);

        // Create an OTP instance associated with the user
        const otpInstance = await OTP.create({
            otp,
            user: user._id,
        });

        const token = jwt.sign({
            userId: user._id,
            email: user.email,
        },
            process.env.JWT_SECRET, { expiresIn: "50 mins" })

        user.lastOtpId = otpInstance._id;
        user.token = token;

        // send verification email
        const mailOptions = {
            email: user.email,
            subject: "Verify your account",
            html: signUpTemplate(otp, user.fullName),
        };

        
        // save the user
        await user.save();
        await sendEmail(mailOptions);

        // return a response
        res.status(201).json({
            message: `Check your email: ${user.email} to verify your account.`,
            data: user
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}




// verify email
exports.verifyEmail = async (req, res) => {
    try {
        const { otp } = req.body;
        const { token } = req.params;

        if (!otp) {
            return res.status(400).json({
                message: "Please enter OTP"
            });
        }
        if (!token) {
            return res.status(404).json({
                message: "Token not found"
            });
        }

        // Verify the token and extract the user's email
        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        // Retrieve user from the database based on the email
        const user = await userModel.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check if the user has already been verified
        if (user.isVerified) {
            return res.status(400).json({
                message: "User already verified"
            });
        }

        // Retrieve the stored OTP document based on the user otp input
        const storedOtp = await OTP.findOne({ otp: otp });

        if (!storedOtp) {
            return res.status(404).json({
                message: 'Invalid OTP'
            });
        }

        // Compare the user-entered OTP with the stored OTP
        if (storedOtp._id.toString() === user.lastOtpId.toString()) {
            user.isVerified = true;
            await user.save();

            return res.status(200).json({
                message: "Email verification successful. You can now log in.",
                data: user.isVerified,
            });
        } else {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }
        // res.status( 200 ).redirect( `${req.protocol}://${req.get("host")}/api/log-in` );

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(404).json({
                message: "Session timed-out."
            });
        }
        res.status(500).json({
            message: error.message
        })
    }
}




// resend verification
exports.resendVerificationEmail = async (req, res) => {
    try {
        // get user email from request body
        const { email } = req.body;

        // find user
        const user = await userModel.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        // Check if user has already been verified
        if (user.isVerified) {
            return res.status(400).json({
                error: "User already verified"
            });
        }

        // Generate OTP
        const otp = otpGenerator.generate(4, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        console.log(otp);

        // Create an OTP instance associated with the user
        const otpInstance = await OTP.create({
            otp,
            user: user._id,
        });

        user.lastOtpId = otpInstance._id;
        // create a token
        const token = await jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "50m" });

        // send verification email
        const mailOptions = {
            email: user.email,
            subject: "Verify your account",
            html: signUpTemplate(otp),
        };

        await user.save();
        await sendEmail(mailOptions);

        res.status(200).json({
            message: `Verification email sent successfully to your email: ${user.email}`,
            token
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}





// Forgot Password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(404).json({
                message: "Please enter email address"
            });
        }

        // Check if the email exists in the userModel
        const user = await userModel.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Generate OTP
        const otp = otpGenerator.generate(4, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        console.log(otp);

        // Create an OTP instance associated with the user
        const otpInstance = await OTP.create({
            otp,
            user: user._id,
        });

        user.lastOtpId = otpInstance._id;

        // create a token
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "30 mins" });


        // Send reset password email
        const mailOptions = {
            email: user.email,
            subject: "Password reset OTP",
            html: forgotPasswordTemplate(otp, user.fullName),
        };;

        await user.save();
        await sendEmail(mailOptions);

        res.status(200).json({
            message: "Password reset email sent successfully",
            token
        });
    } catch (error) {
        console.error("Something went wrong", error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

// verify email
exports.verifyEmailOTP = async (req, res) => {
    try {
        const { otp } = req.body;
        const { token } = req.params;

        if (!otp) {
            return res.status(400).json({
                message: "Please enter OTP"
            });
        }
        if (!token) {
            return res.status(404).json({
                message: "Token not found"
            });
        }

        // Verify the token and extract the user's email
        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        // Retrieve user from the database based on the email
        const user = await userModel.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Retrieve the stored OTP document based on the user otp input
        const storedOtp = await OTP.findOne({ otp: otp });

        if (!storedOtp) {
            return res.status(404).json({
                message: 'Invalid OTP'
            });
        }

        // Compare the user-entered OTP with the stored OTP
        if (storedOtp._id.toString() === user.lastOtpId.toString()) {
            return res.status(200).json({
                message: "Verification successful. Please proceed to input your new password."
            });
        } else {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }
        // res.status( 200 ).redirect( `${req.protocol}://${req.get("host")}/api/log-in` );

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(404).json({
                message: "Session timed-out."
            });
        }
        res.status(500).json({
            message: error.message
        })
    }
}

// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Verify the user's token
        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Salt and hash the new password
        const saltedRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltedRound);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            message: "Password reset successful"
        });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(404).json({
                message: "Session timed-out."
            });
        }
        console.error("Something went wrong", error.message);
        res.status(500).json({
            message: error.message
        });
    }
};





// User login
exports.userLogin = async (req, res) => {
    try {
        // Extract the user's email and password
        const { password, email } = req.body;

        // find user by their registered email or username
        const checkUser = await userModel.findOne({ email: email.toLowerCase() })

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

        // Check if the user if verified
        if (!checkUser.isVerified) {
            return res.status(404).json({
                message: `User with this email: ${email} is not verified.`
            })
        }

        const token = jwt.sign({
            userId: checkUser._id,
            email: checkUser.email,

        },
            process.env.JWT_SECRET, { expiresIn: "50 mins" })

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





// Change Password
exports.changePassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, existingPassword } = req.body;

        // Verify the user's token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Get the user's Id from the token
        const userId = decodedToken.userId;

        // Find the user by ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Confirm the previous password
        const isPasswordMatch = await bcrypt.compare(existingPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Existing password does not match"
            });
        }

        // Salt and hash the new password
        const saltedRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltedRound);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            message: "Password changed successful"
        });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(404).json({
                message: "Session timed-out."
            });
        }
        console.error("Something went wrong", error.message);
        res.status(500).json({
            message: error.message
        });
    }
};




// User sign out
exports.signOut = async (req, res) => {
    try {
        const { userId } = req.params;

        // Update the user's token to null
        let user = await userModel.findByIdAndUpdate(userId, { token: null }, { new: true });

        if (!user) {
            user = await workerModel.findByIdAndUpdate(userId, { token: null }, { new: true });
        }

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        return res.status(200).json({
            message: 'User logged out successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

