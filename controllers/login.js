const User = require('../models/users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const config = require('config');

const authenticate =  async (req, res) => {
    // Check to see if the email exists in the users database. If it doesn't, it means that it is an invalid email.
    const user = await User.findOne({ email: req.body.email});
    if (!user) return res.status(400).json({msg: "Invalid username or password."});

    // Check if the password matched the hashed password in the database.
    const isCorrectPassword = await bcrypt.compare(req.body.password, user.password)
    // If invalid password, return an error message to the client
    if (!isCorrectPassword) return res.status(400).json({msg: "Invalid username or password."});

    // If the password is valid, send a json web token to the client
    // TODO: Private key is Movenpick123 for now, don't forget to delete it before pushing code to github repo
    const token = jwt.sign({_id: user._id, firstName: user.firstName}, config.get("jwtPrivateKey")) 
    res.status(200).send(token);
}



module.exports = {
    authenticate
}