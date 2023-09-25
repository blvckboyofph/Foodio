const mongoose = require('mongoose') 
const {Schema} = mongoose 

const dinner = new Schema({  
    dinnerName: {
        type: String,
        require: true,
        minlength: [5, 'dinnerName must not be less than 15 characters'],
        trim: true
    },
    dinnerImage: {
        type: String,
        require: true,
        minlength: [5, 'dinnerImage must not be less than 15 characters'],
        trim: true 
    }, 
    dinnerPrice: {
        type: String, 
        require: true,
        minlength: [5, 'dinnerPrice must not be less than 5 characters'],
        trim: true
    },

    dinnerDescription: {
        type: String,
        require: true,
        minlength: [5, 'dinnerDescription must not be less than 15 characters'],
        trim: true
    }

}) 

module.exports = mongoose.model('dinner',dinner)     
