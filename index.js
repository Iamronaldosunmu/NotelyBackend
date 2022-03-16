const express = require('express');
const cors = require('cors');
const app = express();
const config = require('config');
const connect = require('./db/connect');
const users = require('./routes/users');
const login = require('./routes/login');
const notes = require('./routes/note'); 
const images = require('./routes/image'); 

const connectionString = config.get('connectionString');
const port = process.env.PORT || config.get('port');

app.use(cors());
app.use(express.json());
app.use('/api/v1/users', users);
app.use('/api/v1/login', login);
app.use('/api/v1/notes', notes);
app.use('/api/v1/image', images)

if (!config.get("jwtPrivateKey")) throw new Error("No secret key provided");


connect(app, port, connectionString);