class APIFeatures{
    // query -> Product.find()  & queryStr -> req.query.keyword
    constructor(query, queryStr){           
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex : this.queryStr.keyword,
                $options : 'i'
            }
        } : {};

       
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr};

        // removing fields from query string
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(removeField => delete queryCopy[removeField]);
     
        // advanced filters for prices(between, range), ratings (<, >), etc.
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match=> `$${match}`);
       
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage*(currentPage-1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}


module.exports = APIFeatures;