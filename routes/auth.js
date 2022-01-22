const express = require('express');
const router = express.Router();

// controllers
const { 
    registerUser, 
    loginUser, 
    logoutUser, 
    forgotPassword, 
    resetPassword
} = require('../controllers/authController')

// middlewares
const {isAuthenticated} = require('../middlewares/auth')

// resgister a user
router.post('/register', registerUser);

// login 
router.post('/login', loginUser);

// logout
router.get('/logout', logoutUser);

// forgot password
router.post('/password/forgot', forgotPassword)

// reset password
router.put('/password/reset/:token', resetPassword)

module.exports = router;