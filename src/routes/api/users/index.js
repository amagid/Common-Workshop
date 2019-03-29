const employees = require('./users');
const validate = require('../../../middlewares/validate');
const validators = require('./validators');
const respond = require('../../../middlewares/respond');

module.exports = function mountEmployees(router) {

    router.post('/create',
        validate(validators.createEmployee),
        respond((req, res) => employees.createEmployee(req.body)));

    router.get('/',
        validate(validators.getAllEmployees),
        respond((req, res) => employees.getAllEmployees()));

    router.get('/:employeeId',
        validate(validators.getEmployeeInfo),
        respond((req, res) => employees.getEmployeeInfo(req.params.employeeId)));

    router.patch('/:employeeId',
        validate(validators.updateEmployee),
        respond((req, res) => employees.updateEmployee(req.params.employeeId, req.body)));

    router.delete('/:employeeId',
        validate(validators.deleteEmployee),
        respond((req, res) => employees.deleteEmployee(req.params.employeeId)));

};