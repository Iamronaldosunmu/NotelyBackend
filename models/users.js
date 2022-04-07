const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String, 
        minlength: 3, 
        required: true, 
        maxlength: 255, 
        trim: true
    },
    email: {
        type: String, 
        minlength: 3, 
        required: true, 
        maxlength: 255, 
        unique: true, 
        trim: true
    }, 
    password: {
        type: String, 
        minlength: 3, 
        required: true
    }, 
    avatarUrl: {
        type: String, 
        required: false, 
        default: ''
    }, 
    avatarCloudinaryId: {
        type: String, 
        required: false, 
        default: ''
    }
})

module.exports = mongoose.model('User', userSchema);