const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter product name"],
        trim: true
    },
    price : {
        type: Number,
        required: [true, "Please enter product price"],
        default : 0.0
    },
    description : {
        type : String,
        required : [true, "Please enter product description"]
    }, 
    ratings:  {        // 5 + 4 = 4.5
        type: Number,
        default: 0
    },
    images: [
        {
            public_id : {
                type : String,
                required: true
            },
            url : {
                type : String,
                required: true
            }
        }
    ],
    category : {
        type: String,
        required : [true, "Please choose category for this product"],
        enum : {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                "Books",
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message : 'Please select correct category for product'
        }
    },
    seller : {
        type : String,
        required : [true, "Please enter product seller"]
    },
    stock : {
        type :Number,
        required : [true, "Please enter product stock"],
        default : 0
    },
    numOfReview : {
        type: Number,
        default: 0
    },
    reviews : [
        {
            user : {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user : {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;