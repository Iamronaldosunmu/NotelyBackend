const router = require('express').Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');

const uploadImage = async (req, res) => {
    try {

        const result = await cloudinary.uploader.upload(req.file.path) ;
        res.json(result);
    } catch (err) {
        console.log(err)
    }
};




module.exports = {uploadImage};