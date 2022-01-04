const User = require('../models/users');

const createNewUser =  async (req, res) => {
    // If there is a user with that email already in db retrun 400 status code with message: User already exists
    const user = await User.find({email: req.body.email});
    if (user) return res.status(400).json({msg: "You already have an account, Login"})

    // Get the password and Hash it before storing it in the db
    try{
        const user = new User(req.body);
        result = await user.save();
        res.json(result);
    }catch(error){
        res.send(error)
    }

} 

const getUser = (req, res) => {
    res.send("This is the user with the id: " + req.params.id);
}

module.exports = {
    createNewUser, getUser
}