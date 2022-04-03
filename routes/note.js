const express = require('express'); 
const router = express.Router();
const {getAllNotes, createNewNote, getNote, deleteNote, editNote, getSharedNote} = require('../controllers/note');

router.route('/sharedNote/:noteId').get(getSharedNote);
router.route('/:userId').post(createNewNote).get(getAllNotes);
router.route('/:userId/:noteId').get(getNote).delete(deleteNote).patch(editNote);

module.exports = router;