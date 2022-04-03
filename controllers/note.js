const Note = require('../models/note');
const User = require('../models/users');
const mongoose = require('mongoose');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');

const createNewNote = async (req, res) => {
    // Check if the user id that is passed is a valid mongoose object id
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send("The userId is not a valid mongoose object id");
    // If the user id is a valid mongoose object id, check if it exists in the users database
    const user = await User.findOne({_id: userId});
    if (!user) return res.status(404).send('User not found');
    // If the user id exists in the users database, create a new note
    if (user) {
        const {title, noteContent, dateCreated, selectedColor, imageUrl, imageCloudinaryId} = req.body;
        const note = new Note({userId, title, noteContent, dateCreated, selectedColor, imageUrl, imageCloudinaryId});
        const result = await note.save()
        return res.json(result);
    }
}
const deleteNote = async (req, res) => {
    // Check if the note _id that is passed is a valid mongoose object id
    const noteId = req.params.noteId;
    if (!mongoose.Types.ObjectId.isValid(noteId)) return res.status(400).send("The noteId is not a valid mongoose object id");
    // If the note id is a valid mongoose object id, check if it exists in the note database
    let note = await Note.findOne({_id: noteId});
    if (!note) return res.status(404).send("There is no note with that id in the db");
    // Check if the note has any image and if it does, destroy it from cloudinary storage
    if (note.imageCloudinaryId) {
        try {
            await cloudinary.uploader.destroy(note.imageCloudinaryId);
        }catch(err) {
            res.status(400).json(err)
        }
    }

    note = await Note.deleteOne({_id: noteId})
    res.status(204).json(note);


}
const getAllNotes = async (req, res) => {
    // Check if the user id that is passed is a valid mongoose object id
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send("Your item is not a valid object id");

    // If the user id is a valid mongoose object id, check if it exists in the users database
    const user = await User.findOne({_id: userId});
    if (!user) return res.status(404).send('User not found');
    // If it exists in the User's database, send all the notes that match that users id
    else {
        const notes = await Note.find({userId: userId});
        return res.json(notes);
    }
}

const getNote = async (req, res) => {
    // Check if the user id that is passed is a valid mongoose object id
    const userId = req.params.userId;
    const noteId = req.params.noteId;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send("Your item is not a valid object id");
    if (!mongoose.Types.ObjectId.isValid(noteId)) return res.status(400).send("Your item is not a valid object id");

    // If the user id is a valid mongoose object id, check if it exists in the users database
    const note = await Note.findOne({userId, _id: noteId});
    if (!note) return res.status(404).send("There is no note with the userId and noteId match");
    else return res.status(201).json(note);
}

const editNote = async (req, res) => {
    // Check if the user id that is passed is a valid mongoose object id
    const userId = req.params.userId;
    const noteId = req.params.noteId;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send("Your item is not a valid object id");
    if (!mongoose.Types.ObjectId.isValid(noteId)) return res.status(400).send("Your item is not a valid object id");

    // If the user id is a valid mongoose object id, check if it exists in the users database
    const note = await Note.findOne({userId, _id: noteId});
    if (!note) return res.status(404).send("There is no note with the userId and noteId match");
    note.title = req.body.title;
    note.noteContent = req.body.noteContent;
    note.dateCreated = req.body.dateCreated;
    note.selectedColor = req.body.selectedColor;
    const result = await note.save();
    return res.status(201).json(result);  
}
const getSharedNote = async (req, res) => {
    const noteId = req.params.noteId;
    console.log(noteId);
    if (!mongoose.Types.ObjectId.isValid(noteId)) return res.status(400).send("Your item is not a valid object id");
    const note = await Note.findOne({ _id: noteId});
    console.log(note);
    if (!note) return res.status(404).send("There is no note with the userId and noteId match");
    else return res.status(201).json(note);
} 
module.exports = {
    createNewNote, getAllNotes, getNote, deleteNote, editNote, getSharedNote
};