
// require('dotenv').config()
const mongoose = require('mongoose');
// console.log(process.env.DB)
const dbLink = 'mongodb+srv://kayceethetechboy:only1kaycee2@cluster0.lee4t5y.mongodb.net/?retryWrites=true&w=majority'

function connectDB() {
    try{
        console.log("connecting to db")
        mongoose.connect(dbLink,{
            useNewUrlParser:true,
            useUnifiedTopology:true,}).then(e => console.log("database connected successfully"))

        // console.log("connection to db")
        //  mongoose.connect('mongodb://127.0.0.1:27017/database')
    
        //  console.log("connected")
        }
     catch (error) {
          console.log(error)  
    }
}

module.exports = connectDB 