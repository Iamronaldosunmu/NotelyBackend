const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

async function run(){
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
}

const createNewUser =  async (req, res) => {
    // If there is a user with that email already in db retrun 400 status code with message: User already exists
    const user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).json({msg: "You already have an account, Login"})

    // Get the password and Hash it before storing it in the db
    let {firstName, email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);    
    try{
        const user = new User({firstName, email, password});
        result = await user.save();
        const {firstName: name, email: mail, _id: id} = result;

        const token = jwt.sign({_id: id, firstName: name, avatarUrl: ''}, config.get("jwtPrivateKey"))
        res.status(200).send(token);
    }catch(error){
        res.send(error);
    }

} 

const getUser = (req, res) => {
    res.send("This is the user with the id: " + req.params.id);
}

module.exports = {
    createNewUser, getUser
}