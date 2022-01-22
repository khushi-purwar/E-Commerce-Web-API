// Error handler class

class ErrorHandler extends Error{
    constructor(errorMessage, statusCode){
        super(errorMessage);
    
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
    
}

module.exports = ErrorHandler;