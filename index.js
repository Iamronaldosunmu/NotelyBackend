const express = require('express');
const cors = require('cors');
const app = express();
const config = require('config');
const connect = require('./db/connect');

const connectionString = config.get('connectionString');
const port = process.env.PORT || config.get('port');

app.use(cors());
app.use(express.json());

connect(app, port, connectionString);