const mongoose = require('mongoose') 
const {Schema} = mongoose 

const lunch = new Schema({  
    lunchName: {
        type: String,
        require: true,
        minlength: [5, 'lunchName must not be less than 15 characters'],
        trim: true
    },
    lunchImage: {
        type: String,
        require: true,
        minlength: [5, 'lunchImage must not be less than 15 characters'],
        trim: true 
    }, 
    lunchPrice: {
        type: String, 
        require: true,
        minlength: [5, 'lunchPrice must not be less than 5 characters'],
        trim: true
    },

    lunchDescription: {
        type: String,
        require: true,
        minlength: [5, 'lunchDescription must not be less than 15 characters'],
        trim: true
    }

}) 

module.exports = mongoose.model('lunch',lunch)     
