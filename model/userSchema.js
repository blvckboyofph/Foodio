const mongoose = require('mongoose') 
const {Schema} = mongoose 

const newUser = new Schema({  
    firstName: {
        type: String,
        require: true,
        minlength: [5, 'firstName must not be less than 15 characters'] 
    },
    lastName: {
        type: String,
        require: true,
        minlength: [5, 'lastName must not be less than 15 characters'] 
    },
    email: {
        type: String,
        require: true,
        minlength: [5, 'email must not be less than 15 characters'] 
    },
    password: {
        type: String,
        require: true,
        minlength: [5, 'password must not be less than 15 characters']  
    },
    role: {
        type: String,
        require: true,
    }


}) 

module.exports = mongoose.model('User', newUser)     
