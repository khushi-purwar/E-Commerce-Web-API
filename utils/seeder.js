const productModel = require('../models/product');
const dotenv = require('dotenv');

// dummy data
const products = require('../data/products');

// setting up config files
dotenv.config({path:  'backend/config/config.env'})

// database
const db = require('../config/database');

const seedDB = async()=>{
    try{
        await productModel.deleteMany();
        console.log("Products are deleted successfully!");
        await productModel.insertMany(products);
        console.log("Products are inserted successfully!");
    }
    catch(error){
        console.log(error.message);
        process.exit();
    }
}

seedDB();