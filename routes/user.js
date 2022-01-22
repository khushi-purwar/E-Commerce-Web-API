const express = require('express');
const router = express.Router();

// middlewares
const {isAuthenticated, authorizeRoles} = require('../middlewares/auth')

const {   
    getUserProfile, 
    updatePassword, 
    updateProfile , 
    getAllUsers, 
    getSpecificUser,
    updateUser, 
    deleteUser
} = require('../controllers/userController')

// get user profile
router.get('/me', isAuthenticated ,getUserProfile);

// change/update password
router.put('/password/update', isAuthenticated, updatePassword)

// update user profile
router.put('/me/update', isAuthenticated, updateProfile);

// get all user -> admin routes
router.get('/admin/users', isAuthenticated, authorizeRoles('Admin'), getAllUsers);

// get a specific user  -> admin routes
router.get('/admin/user/:id', isAuthenticated, authorizeRoles('Admin'), getSpecificUser)

// update user  => admin routes
router.put('/admin/user/:id', isAuthenticated, authorizeRoles('Admin'), updateUser)

// delete user  => admin routes
router.delete('/admin/user/:id', isAuthenticated, authorizeRoles('Admin'), deleteUser)

module.exports = router;