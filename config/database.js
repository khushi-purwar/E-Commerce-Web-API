const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console,"Error in connecting Database!"));
db.once("open", ()=>{
    console.log("Database Connected!");
})

module.exports = db;