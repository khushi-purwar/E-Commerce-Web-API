const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');

//  utils
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');

// get currenlty logged in user details   => /api/v1/me
exports.getUserProfile = async(req,res,next) => {
    try {
        const user = await UserModel.findById(req.user._id);
        res.status(200).json({ 
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message
        })
    }
}

// updated/change password   => /api/v1/password/update
exports.updatePassword = async(req, res, next)=>{
   try {
    const user = await UserModel.findById(req.user.id).select('+password');

    // check old password of user
    const isMatched = await bcrypt.compare(req.body.oldPassword, user.password);

    if(!isMatched){
        return next(new ErrorHandler('Old Password is Incorrect', 401))
    }

    // setup new password
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    sendToken(user, 200, res, "Password Changed Successfully!");
   } catch (error) {
    res.status(500).json({ 
        success: false,
        message: error.message
    })
   }
}

// update user profile   => /api/v1/me/update
exports.updateProfile = async  (req, res, next) =>{
    try {
        const newUserData = {
            name : req.body.name,
            email : req.body.email
        }

        const updatedUser = await UserModel.findByIdAndUpdate(req.user.id, newUserData, {new: true});

        res.status(200).json({
            success: true,
            message : "Profile Updated Successfully!",
            updatedUser
        })
       
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message
        })
    }
}


// =====================================ADMIN ROUTES===============================

// get all users  => /api/v1/admin/users
exports.getAllUsers = async (req, res)=>{
    try {
        const users = await UserModel.find();
        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message
        })
    }
}

// get a specific users  => /api/v1/admin/user/:id
exports.getSpecificUser = async (req, res, next)=>{
    try {
        const user = await UserModel.findById(req.params.id);

        if(!user){
            return next(new ErrorHandler(`User Does Not Found With Id : ${req.params.id}`, 400))
        }
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message
        })
    }
}

// update user    => /api/v1/admin/user/:id
exports.updateUser = async  (req, res, next) =>{
    try {
        const newUserData = {
            name : req.body.name,
            email : req.body.email,
            role: req.body.role
        }

        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, newUserData, {new: true});

        res.status(200).json({
            success: true,
            message : "User Updated Successfully Through Admin!",
            updatedUser
        })
       
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message
        })
    }
}

// delete a user => /api/v1/admin/user/:id
exports.deleteUser = async (req, res, next) =>{
    try {
        const deleteUser = await UserModel.findByIdAndDelete(req.params.id);

        if(!deleteUser){
            return next(new ErrorHandler('No User Found With This ID', 404));
        }

        res.status(200).json({
            success: true,
            message : "User Deleted Successfully Through Admin!",
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message
        })
    }
}
