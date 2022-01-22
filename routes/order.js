const express = require('express');
const router = express.Router();

// controllers 
const {
    newOrder, 
    getSingleOrder, 
    myOrder, 
    allOrders, 
    deleteOrder, 
    updateOrder
} = require('../controllers/orderController');

// middlewares
const {isAuthenticated, authorizeRoles} = require('../middlewares/auth')

// create new order
router.post('/order/new', isAuthenticated,  newOrder);

// get a single order
router.get('/order/:id', isAuthenticated,  getSingleOrder);

// get a logged-in user order
router.get('/orders/me', isAuthenticated,  myOrder);

// get all orders  => ADMIN Routes
router.get('/admin/orders', isAuthenticated, authorizeRoles('Admin') , allOrders);

// update & process orders  => ADMIN Routes
router.put('/admin/order/:id', isAuthenticated, authorizeRoles('Admin') , updateOrder);

// delete order
router.delete('/admin/order/:id', isAuthenticated, authorizeRoles('Admin') , deleteOrder);

module.exports = router;