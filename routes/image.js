const router = require('express').Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const Note = require('../models/note');
const User = require('../models/users');


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
router.post('/userImage', upload.single('image'), async (req, res) => {
    try {
        let user = await User.findOne({_id: req.body.userId});
        if (user.avatarCloudinaryId) {
            try {
                await cloudinary.uploader.destroy(user.avatarCloudinaryId);
            }catch(err) {
                res.status(400).json(err)
            }
        }
        const result = await cloudinary.uploader.upload(req.file.path) ;
        const {secure_url, public_id} = result;
        user.avatarUrl = secure_url;
        user.avatarCloudinaryId = public_id;
        console.log(user)
        await user.save()
        res.json({secure_url, public_id});
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

module.exports = router;