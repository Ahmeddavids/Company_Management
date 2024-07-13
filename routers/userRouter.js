const express = require('express');
const { userSignUp, userLogin, signOut, verifyEmail, resendVerificationEmail, changePassword, resetPassword, forgotPassword } = require('../controllers/userController');

const router = express.Router();

router.route('/users/sign-up').post(userSignUp)

router.route('/users/log-in').post(userLogin)

// router.route('/log-out/:userId').post(authenticate, signOut)

router.route("/users/verify-email/:token")
    .post(verifyEmail);

router.route("/users/resend-verification-email")
    .post(resendVerificationEmail);

router.route('/users/change-password/:token')
    .post(changePassword);

router.route('/users/reset-password/:token')
    .post(resetPassword);

router.route('/users/forgot-password')
    .post(forgotPassword);

module.exports = router;
