const users = require('../routes/users');
const login = require('../routes/login');
const notes = require('../routes/note'); 
const images = require('../routes/image'); 
const error = require ('../middleware/error');
const express = require('express');
const cors = require('cors');


module.exports = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use('/api/v1/users', users);
    app.use('/api/v1/login', login);
    app.use('/api/v1/notes', notes);
    app.use('/api/v1/image', images);

    app.use(error)

}