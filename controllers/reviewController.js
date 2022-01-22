const ProductModel = require('../models/product');

//  utils
const ErrorHandler = require('../utils/errorHandler');

// create as well as update new review  => /api/v1/review
exports.newReview = async(req,res,next)=>{
    try {
        const {rating , comment, productId} = req.body;
        const review = {
            user: req.user._id,
            name: req.user.name,
            rating : Number(rating),
            comment 
        }
        const product = await ProductModel.findById(productId);

        const isReviewed = product.reviews.find(
            review => review.user.toString() === req.user._id.toString()
        )

        if(isReviewed) {
            // product.reviews.find( review => {
            //     if(review.user.toString() === req.user._id.toString()){
            //         review.comment = comment,
            //         review.rating = rating
            //     }
            // }
            // )
            isReviewed.rating = rating,
            isReviewed.comment = comment
        }else{
            product.reviews.push(review);
            product.numOfReview = product.reviews.length;   
        }

        // here, acc is the total, and  0 is the current value of acc and return a single value
        product.ratings = product.reviews.reduce((acc, review) => review.rating + acc, 0) / product.numOfReview;
        
        await product.save();

        res.status(200).json({
            success:true
        });

    } catch (error) {
         return res.status(500).json({
                message : error.message
            })
    }
}

// get product reviews   => /api/v1/reviews
exports.getProductReviews = async(req,res,next)=>{
    try {
        const product = await ProductModel.findById(req.query.id)
        return res.status(200).json({
            success : true,
            reviews : product.reviews
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

// delete product reviews   => /api/v1/review
exports.deleteReview = async(req,res,next)=>{
    try {
        let ratings;
        const product = await ProductModel.findById(req.query.productId)
    
        const reviews = product.reviews.filter(review => review._id.toString() !== req.query.reviewId.toString());
     
        const numOfReview = reviews.length;
        
        if(numOfReview == 0){
             ratings = 0 ;
        }else{
             ratings = reviews.reduce((acc, review) => review.rating + acc, 0) / numOfReview;
        }
       
            
        await ProductModel.findByIdAndUpdate(req.query.productId,{
                reviews,
                numOfReview,
                ratings
        }, {new:true})

        return res.status(200).json({
                success : true,
        });
  
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}