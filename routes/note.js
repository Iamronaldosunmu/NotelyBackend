const express = require('express'); 
const router = express.Router();
const {getAllNotes, createNewNote, getNote} = require('../controllers/note');

router.route('/:userId').post(createNewNote).get(getAllNotes);
router.route('/:userId/:noteId').get(getNote);

module.exports = router;