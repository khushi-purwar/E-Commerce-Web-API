const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const crypto  = require('crypto');

//  utils
const ErrorHandler = require('../utils/errorHandler')
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

// Register a user    ----> /api/vi/register
exports.registerUser = async(req,res)=>{
    try{
      const {name, email, password} = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserModel.create({
          name, 
          email, 
          password: hashedPassword,
          avatar : {
            public_id : 'instaImages/pic_msk989',
            url : "https://res.cloudinary.com/devwebcloud/image/upload/v1634582551/instaImages/pic_msk989.jpg"
          }
        });

        sendToken(user, 200, res, "User Created Successfully!");

    }catch(error){
        if (error.name === 'ValidationError') {
            const message = Object.values(error.errors).map(value => value.message);
            return res.status(500).json({
                message 
            })
        }
        else{
            return res.status(500).json({
                message : error.message
            })
        }
    }
}

// login a user

exports.loginUser = async(req,res, next)=>{
    try {
        const {email, password} = req.body;
      
        // check if email and password are entered by user
        if(!email || !password){
            return next(new ErrorHandler('Please Enter Email and Password', 400))
        }

        // check if user exists or not
        const user = await UserModel.findOne({email}).select('+password');
        
        if(!user){
            return next(new ErrorHandler('Invalid Email or Password', 401))
        }

        // check password is correct of existing users
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if(!isPasswordMatched){
            return next(new ErrorHandler('Invalid Email or Password', 401))
        }

        sendToken(user, 200, res, "User Login Successfully!");

    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

// forgot password  => api/v1/password/forgot
exports.forgotPassword = async (req, res, next)=>{

    const user = await UserModel.findOne({email: req.body.email});
    if(!user){
        return next(new ErrorHandler('User Not Found With This Email' , 404));
    }

    // get resetToken
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false});

    // create reset password Url
    const resetUrl = `${req.protocol}//${req.get('host')}/api/v1/password/reset/${resetToken}`;

    // message
    const message = `You Requested for Password Reset. \n\nYour Password Reset Link is Given Below: \n\n${resetUrl}\n\n\n If You Have Not Requested For Reset Password, then Ignore This Mail`;

    try{
        sendEmail({
            email : user.email, 
            subject : 'ShopIT Password Recovery',
            message
        });

        return res.status(200).json({
            success : true,
            message : `Email sent successfully to ${user.email}`,
            
        });

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message , 500));
    }


}

// reset password  =>  /api/v1/password/reset/:token
exports.resetPassword = async (req, res, next) => {

    // Hash URL tokens
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await UserModel.findOne({ 
        resetPasswordToken ,
        resetPasswordExpire : {$gt:Date.now()}
    })

    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has been expired' , 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match' , 400));
    }

    // setup new password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res, "Password Reset Successfully!");
}

exports.logoutUser = async(req,res)=>{
    try{
        res.cookie('token', null, { 
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            message : "User Logout Successfully!"
        })
    }catch(error){
        return res.status(500).json({
            message : error.message
        })
    }
}