const Product = require('../models/product');

//  utils
const ErrorHandler = require('../utils/errorHandler')
const APIFeatures = require('../utils/apifeatures');

// create new product ---> /api/v1/admin/product
exports.createProduct = async(req,res, next)=>{

    try {
        req.body.user = req.user.id;
    const product = await Product.create(req.body);
        return  res.status(200).json({
            success:  true,
            message: 'Product created successfully',
            product
    })

    } catch (error) {
        if (error.name === 'ValidationError') {
            const message = Object.values(error.errors).map(value => value.message);
            return res.status(500).json({
                message 
            })
        }
    }

   
}

// get all products  ---> /api/v1/products
exports.getProducts = async(req,res, next)=>{

    const resPerPage = 5;
    const productCount = await Product.countDocuments();

    try {
        const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().pagination(resPerPage);
        const products = await apiFeatures.query;
        // const products = await Product.find();

        if(products.length > 0){
            
        res.status(200).json({
            success:  true,
            count : products.length,
            productCount,
            products
        })
        }else{

            return next(new ErrorHandler('No Product is Available', 404));
        }
      
    } catch (error) {
        if (error.name === 'CastError') {
            const message = `Resource not found. Invalid: ${error.path}`
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

// get a specifc product using product id  ---> /api/v1/product/:id
exports.getSpecificProduct = async(req,res, next)=>{

    try {
        const product = await Product.findById(req.params.id);

        if(!product){
            return next(new ErrorHandler('Product Not Found', 404));
        }
        res.status(200).json({
            success:  true,
            product
        })
    } catch (error) {
        if (error.name === 'CastError') {
            const message = `Resource not found. Invalid: ${error.path}`
            return res.status(500).json({
                message 
            })
        } else{
            return res.status(500).json({
                message : error.message
            })
        }
    }
    
}

// update a product using product id  ----> /api/v1/admin/product/:id
exports.updateProduct = async(req,res, next)=>{

    try {
        let updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, 
            {
                new: true
            }
        );
    
        if(!updatedProduct){
            return next(new ErrorHandler('Product Not Found', 404));
        }
    
        res.status(200).json({
            success:  true,
            message: "Product updated successfully",
            product : updatedProduct
        })
    } catch (error) {
        if (error.name === 'CastError') {
            const message = `Resource not found. Invalid: ${error.path}`
            return res.status(500).json({
                message 
            })
        } else{
            return res.status(500).json({
                message : error.message
            })
        }
    }
    
}

// delete product using id  ---> /api/v1/admin/product/:id
exports.deleteProduct = async(req,res, next)=>{
 
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if(!deletedProduct){
            return next(new ErrorHandler('Product Not Found', 404));
        }
    
        res.status(200).json({
            success:  true,
            message: "Product deleted successfully",
        }) 
    } catch (error) {
        if (error.name === 'CastError') {
            const message = `Resource not found. Invalid: ${error.path}`
            return res.status(500).json({
                message 
            })
        } else{
            return res.status(500).json({
                message : error.message
            })
        }
    }
    
}

