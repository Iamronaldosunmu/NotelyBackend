require('express-async-errors');
const express = require('express');
const app = express();
require('./startup/routes')(app);
require('./startup/prod')(app);
const config = require('config');
const connect = require('./db/connect');

const connectionString = config.get('connectionString');
const port = process.env.PORT || config.get('port');

if (!config.get("jwtPrivateKey")) throw new Error("No secret key provided");
connect(app, port, connectionString);

process.on('uncaughtException', (ex) => {
    console.log(ex);
});
process.on('unhandledRejection', (ex) => {
    console.log(ex);
})
