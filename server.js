const express = require('express');
const app = express();
const dotenv = require('dotenv');

const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

// handle uncaught exceptions 
process.on('uncaughtException', err=>{
    console.log(`ERROR : ${err.message}`);
    console.log('Shutting down the server due to """UNCAUGHT EXCEPTIONS"""');
    process.exit(1)

})

// setting up config files
dotenv.config({path:  'config/config.env'})

const port = process.env.PORT;

// database
const db = require('./config/database');

// import routes
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
const reviewRoutes = require('./routes/review');

app.use('/api/v1', productRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', reviewRoutes);

// middlewares
const errorMiddleware = require('./middlewares/errors');
app.use(errorMiddleware);

const server = app.listen(port, ()=>{
    console.log("Server started at port",port);
})

// handle unhandled promise rejections
process.on('unhandledRejection', err=>{
    console.log(`ERROR : ${err.message}`);
    console.log('Shutting down the server due to """UNHANDLED PROMISE REJECTIONS"""');
    server.close( ()=>{
        process.exit(1)
    })
})
