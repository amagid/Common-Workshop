const employees = require('./employees');
const validate = require('../../../middlewares/validate');
const validators = require('./validators');

module.exports = function mountEmployees(router) {

    router.post('/',
        validate(validators.createEmployee),
        (req, res) => res.promise(employees.createEmployee(req.body)));

    router.get('/',
        validate(validators.getAllEmployees),
        (req, res) => res.promise(employees.getAllEmployees()));

    router.get('/:employeeId',
        validate(validators.getEmployeeInfo),
        (req, res) => res.promise(employees.getEmployeeInfo(req.params.employeeId)));

    router.patch('/:employeeId',
        validate(validators.updateEmployee),
        (req, res) => res.promise(employees.updateEmployee(req.params.employeeId, req.body)));

    router.delete('/:employeeId',
        validate(validators.deleteEmployee),
        (req, res) => res.promise(employees.deleteEmployee(req.params.employeeId)));

};