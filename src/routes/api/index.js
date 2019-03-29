const express = require('express');
const mountUsers = require('./employees');
const respond = require('../../middlewares/respond');

module.exports = function mountAPI(router) {
    router.get('/', respond((req, res) => 'Up and Running!'));

    const employees = express.Router();
    mountUsers(employees);
    router.use('/employees', employees);
};