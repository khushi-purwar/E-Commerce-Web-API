const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

//  utils
const ErrorHandler = require('../utils/errorHandler')

// check if users is authenticated or not
exports.isAuthenticated = async(req,res,next)=>{
    try {
        const {token} = req.cookies;
       
        if(!token) 
           return next(new ErrorHandler('Login First to Access this Resource', 401))

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user  = await UserModel.findById(decoded.id);
        next();
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

// handling user roles
exports.authorizeRoles = (...roles)=>{
   
    return (req,res,next)=>{
        if(!roles.includes(req.user.role))
          return next( new ErrorHandler(`${req.user.role} Access Denied`, 403 ));

        next();
    }
}

