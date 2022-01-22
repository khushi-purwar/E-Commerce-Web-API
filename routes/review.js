const express = require('express');
const router = express.Router();

// controllers 
const {
    newReview , 
    getProductReviews,
    deleteReview
} = require('../controllers/reviewController');

// middlewares
const {isAuthenticated, authorizeRoles} = require('../middlewares/auth')

// create new review
router.put('/review', isAuthenticated, newReview);

// get product reviews
router.get('/reviews', getProductReviews);

// delete review
router.delete('/review', isAuthenticated, deleteReview);

module.exports = router;