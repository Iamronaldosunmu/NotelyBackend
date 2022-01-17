const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {
        type: String, 
        trim: true
    }, 
    noteContent: {
        type: String, 
        trim: true, 
        required: true
    }, 
    dateCreated: {
        type: String, 
        trim: true, 
        required: true
    }
});

module.exports = mongoose.model('Note', noteSchema);