const mongoose = require('mongoose');

// Instead of having an array of notes, it is better to just have a notes collection and ensure that each note has a userId which is equivalent to the id of a current user. That way, we can easily filter out the notes that belong to a user using the userId and each note will also have an _id that can be used to uniquely identify it when it is time to update the note document. This also makes the share feature really easy to implement

const noteSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,  
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
    }, 
    selectedColor: {
        type: String,
        trim: true,
        required: true
    }, 
    imageUrl: {
        type: String, 
        trim: true,
        required: false
    }, 
    imageCloudinaryId : {
        type: String, 
        trim: true, 
        required: false
    }    
});

module.exports = mongoose.model('Note', noteSchema);