const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    companyName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: true
    },
    lastOtpId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OTP'
      },
}, { timestamps: true });

userSchema.pre('save', function (next) {
    const user = this;

    // Capitalize the first letter of each word in the fullName and companyName
    user.fullName = capitalizeEachWord(user.fullName);
    user.companyName = capitalizeEachWord(user.companyName);

    next();
});

// Function to capitalize the first letter of each word in a string
function capitalizeEachWord(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

