const express = require('express');
const mountUsers = require('./employees');

module.exports = function mountAPI(router) {
    router.get('/', (req, res) => res.promise('Up and Running!'));

    const employees = express.Router();
    mountUsers(employees);
    router.use('/employees', employees);
};