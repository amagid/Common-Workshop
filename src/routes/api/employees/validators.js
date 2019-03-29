const { check } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');
const regexes = require('../../../../config').get().regexes;


const createEmployee = [
    check('fname').optional().isString(),
    check('lname').optional().isString(),

    sanitize('fname').toString(),
    sanitize('lname').toString(),
];

const getEmployeeInfo = [
    check('employeeId').exists().isInt(),

    sanitize('employeeId').toInt()
];

const getAllEmployees = [
    check('includeInactive').optional().isBoolean(),

    sanitize('includeInactive').toBoolean()
];

const updateEmployee = [
    check('employeeId').exists().isInt(),
    check('fname').optional().isString(),
    check('lname').optional().isString(),

    sanitize('employeeId').toInt(),
    sanitize('fname').toString(),
    sanitize('lname').toString()
];

const deleteEmployee = [
    check('employeeId').exists().isInt(),

    sanitize('employeeId').toInt()
];


module.exports = {
    createEmployee,
    getEmployeeInfo,
    getAllEmployees,
    updateEmployee,
    deleteEmployee
};