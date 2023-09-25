const mongoose = require('mongoose') 
const {Schema} = mongoose 

const breakfast = new Schema({  
    breakfastName: {
        type: String,
        require: true,
        minlength: [5, 'breakfastName must not be less than 15 characters'],
        trim: true
    },
    breakfastImage: {
        type: String,
        require: true,
        minlength: [5, 'breakfastImage must not be less than 15 characters'],
        trim: true 
    }, 
    breakfastPrice: {
        type: String, 
        require: true,
        minlength: [5, 'breakfastPrice must not be less than 5 characters'],
        trim: true
    },

    breakfastDescription: {
        type: String,
        require: true,
        minlength: [5, 'breakfastDescription must not be less than 15 characters'],
        trim: true
    }

}) 

module.exports = mongoose.model('breakfast',breakfast)     
