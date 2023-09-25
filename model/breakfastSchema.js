const mongoose = require('mongoose') 
const {Schema} = mongoose 

const breakfast = new Schema({  
    breakfastName: {
        type: String,
        require: true,
        minlength: [5, 'breakfastName must not be less than 15 characters'] 
    },
    breakfastImage: {
        type: String,
        require: true,
        minlength: [5, 'breakfastImage must not be less than 15 characters'] 
    }, 
    breakfastPrice: {
        type: String, 
        require: true,
        minlength: [5, 'breakfastPrice must not be less than 5 characters']
    },

    breakfastDescription: {
        type: String,
        require: true,
        minlength: [5, 'breakfastDescription must not be less than 15 characters']  
    }

}) 

module.exports = mongoose.model('breakfast',breakfast)     
