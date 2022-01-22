const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name : {
        type : 'String',
        required: [true, 'Please enter your name'],
        maxLength : [30, 'Your name cannot exceed 30 characters']
    },
    email :{
        type : 'String',
        required: [true, 'Please enter your email'],
        unique : true,
        validate : [validator.isEmail, 'Please Enter a Valid Email Address']
    },
    password : {
        type : 'String',
        required: [true, 'Please enter your password'],
        minlength : [6, 'Password must be longer than 6 characters'],
        select : false,
    },
    avatar : {
        public_id : {
            type : String,
            required: true
        },
        url : {
            type : String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'Customer',
        enum: ['Customer', 'Admin']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

// Returning JWT
userSchema.methods.getJwtToken = function(){
   
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

// generate password reset token
userSchema.methods.getResetPasswordToken = function(){
    // generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000   // 30 minutes

    return resetToken;
}

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;