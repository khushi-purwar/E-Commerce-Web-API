const OrderModel = require('../models/order');
const ProductModel = require('../models/product');

//  utils
const ErrorHandler = require('../utils/errorHandler');

// create a new order   => /api/v1/order/new
exports.newOrder = async(req,res,next)=>{
    try {
        const order = await OrderModel.create({
           ... req.body,
           paidAt : Date.now(),
           user: req.user._id
        } )

        res.status(200).json({
           success: true,
           message: 'Order created successfully',
           order
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

// get single order   => /api/v1/order/:id
exports.getSingleOrder = async(req,res, next)=>{
    try {
        const order = await OrderModel.findById(req.params.id).populate('user', 'name email');
        if(!order){
            return next(new ErrorHandler('No Order Found With This ID', 404));
        }
        res.status(200).json({
            success: true,
            order
        })
        
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

// get logged-in user orders   => /api/v1/orders/me
exports.myOrder = async(req,res, next)=>{
    try {
        const order = await OrderModel.find({user: req.user.id})

        res.status(200).json({
            success: true,
            order
        })
        
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}


// ADMIN 

// get all orders  => /api/v1/admin/orders
exports.allOrders = async(req,res, next)=>{
    try {
        const orders = await OrderModel.find().populate('user', 'name email');

        let totalAmount = 0;
        orders.forEach(order => {
            totalAmount += order.totalPrice;
        })

        res.status(200).json({
            success: true,
            totalAmount,
            orders            
        })
        
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

// update /process order  => /api/v1/admin/order/:id
exports.updateOrder = async (req,res, next)=>{
    try {
        const order = await OrderModel.findById(req.params.id);

        if(order.orderStatus === 'Delivered'){
            return next(new ErrorHandler('You have already delivered this order', 400));
        }

        order.orderItems.forEach(async item =>{ 
            await updateStock(item.product, item.quantity);
        })

        order.orderStatus = req.body.status;
        order.deliveredAt = Date.now();

        await order.save();

        res.status(200).json({
            success: true,
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

// delete order  => /api/v1/admin/order/:id
exports.deleteOrder = async(req, res, next) => {
    try {
        const deletedOrder = await OrderModel.findByIdAndDelete(req.params.id);

        if(!deletedOrder){
            return next(new ErrorHandler('No Order Found With This ID', 404));
        }

        res.status(200).json({
            success: true,
            message : "Order Deleted Successfully Through Admin!",
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}


// updatedStock Function

async function updateStock(id, qty){
    const product = await ProductModel.findById(id);

    product.stock = product.stock - qty;

    await product.save();
}