'use strict';
const http = require('http');
const express = require('express');
const app = express();
const config = require('../config').get();
const logger = require('./services/logger');
const db = require('./services/mysql');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const responsePromise = require('./middlewares/response-promise');

const startup = db.connect()
    .then((connection) => {
        return require('./models/sync')();
    }).then(() => {
        return setUpAPI();
    }).then(() => {
        return startServer();
    }).catch(err => {
        console.log("ERROR ON STARTUP: ", JSON.stringify({ message: err.message, code: err.code, stack: err.stack }, null, 4));
    });

function startServer() {
    const server = http.Server(app);

    server.listen(process.env.PORT || config.app.port);
    logger.info({ message: `Server listening on port ${process.env.PORT || config.app.port}` });

    return server;
}

function setUpAPI() {
    const routes = require('./routes');

    //General middlewares
    app.use(morgan('dev'));
    app.use(bodyParser.json({
        type: 'application/json'
    }));
    app.use(cors());
    app.use(responsePromise);
    
    //Register API Routes
    const router = express.Router();
    routes(router);
    app.use('/', router);
}

module.exports = {
    startup
};