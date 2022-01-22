const express = require('express');
const router = express.Router();

const { 
    createProduct , 
    getProducts, 
    getSpecificProduct, 
    updateProduct, 
    deleteProduct
} = require('../controllers/productController');

// middlewares
const {isAuthenticated, authorizeRoles} = require('../middlewares/auth')

// get all products
router.get('/products',getProducts);

// create new product
router.post('/admin/product', isAuthenticated , authorizeRoles('Admin'), createProduct);

// get a specifc product using product id
router.get('/product/:id', getSpecificProduct)

// update a product using product id  
router.put('/admin/product/:id', isAuthenticated , authorizeRoles('Admin'), updateProduct)

// delete a product using product id  
router.delete('/admin/product/:id', isAuthenticated , authorizeRoles('Admin'), deleteProduct)

module.exports = router;