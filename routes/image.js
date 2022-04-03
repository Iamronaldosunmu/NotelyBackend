const router = require('express').Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const Note = require('../models/note');


router.post('/', upload.single('image'), async (req, res) => {
    // res.send("This route is actually working")
    try {
        const note = await Note.findOne({_id : req.body.noteId});
        const result = await cloudinary.uploader.upload(req.file.path) ;
        const {secure_url, public_id} = result;
        note.imageUrl = secure_url;
        note.imageCloudinaryId = public_id;
        await note.save()
        res.json({secure_url, public_id});
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})
router.post('/newImage', upload.single('image'), async (req, res) => {
    // res.send("This route is actually working")
    try {
        const result = await cloudinary.uploader.upload(req.file.path) ;
        const {secure_url, public_id} = result;
        res.json({secure_url, public_id});
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

module.exports = router;