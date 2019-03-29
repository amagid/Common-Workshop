const { check } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');
const regexes = require('../../../../config').get().regexes;


const createUser = [
    check('fname').optional().isString(),
    check('lname').optional().isString(),
    check('username').optional().isString(),
    check('password').optional().isString(),
    check('smsNumber').optional({ checkFalsy: true }).matches(regexes.phoneNumber),
    check('email').exists().isString(),
    check('pushNotifId').optional().isString(),
    check('role').exists().isIn(['admin']),

    sanitize('fname').toString(),
    sanitize('lname').toString(),
    sanitize('username').toString(),
    sanitize('password').toString(),
    sanitize('smsNumber').toString(),
    sanitize('email').toString(),
    sanitize('pushNotifId').toString(),
    sanitize('role').toString()
];

const getUserInfo = [
    check('userId').exists().isInt(),

    sanitize('userId').toInt()
];

const getAllUsers = [
    check('includeInactive').optional().isBoolean(),

    sanitize('includeInactive').toBoolean()
];

const updateUser = [
    check('userId').exists().isInt(),
    check('fname').optional().isString(),
    check('lname').optional().isString(),
    check('username').optional().isString(),
    check('pass').optional().isString(),
    check('oldPass').optional().isString(),
    check('smsNumber').optional().matches(regexes.phoneNumber),
    check('email').optional().isString(),
    check('pushNotifId').optional().isString(),

    sanitize('userId').toInt(),
    sanitize('fname').toString(),
    sanitize('lname').toString(),
    sanitize('username').toString(),
    sanitize('pass').toString(),
    sanitize('oldPass').toString(),
    sanitize('smsNumber').toString(),
    sanitize('email').toString(),
    sanitize('pushNotifId').toString()
];

const deleteUser = [
    check('userId').exists().isInt(),

    sanitize('userId').toInt()
];


module.exports = {
    createUser,
    getUserInfo,
    getAllUsers,
    updateUser,
    deleteUser
};