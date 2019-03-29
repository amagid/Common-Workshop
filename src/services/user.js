const config = require('../../config').get();
const Employee = require('../models/Employee');
const Promise = require('bluebird');
const APIError = require('../APIError');

function createEmployee(employeeData) {
    const { fname, lname } = employeeData;

    return Employee.create({
                fname,
                lname
        })
        .spread((createdEmployee) => {
            return {
                message: "Employee Created Successfully",
                createdEmployeeId: createdEmployee.id
            };
        })
        .catch(err => {
            throw APIError(err.status || 500, err.message || "Employee Creation Failed", err);
        });
}

function getEmployeeInfo(employeeId) {
    return Employee.findById(employeeId, { paranoid: false })
        .then(employee => {
            return Employee.extractReturnableFields(employee);
        })
        .catch(err => {
            throw APIError(404, 'Employee Not Found', err);
        });
}

function getAllEmployees() {
    return Employee.findAll({ paranoid: !includeInactive })
        .then(employees => {
            return Employee.extractReturnableFields(employees);
        })
        .catch(err => {
            throw APIError(500, 'Employee Retrieval Failed', err);
        });
}

function updateEmployee(employeeId, data) {
    const { fname, lname } = data;
    let newEmployeeObj = {};
    if (fname) newEmployeeObj.fname = fname;
    if (lname) newEmployeeObj.lname = lname;
    if (employeename) newEmployeeObj.employeename = employeename;
    if (loginResult && loginResult.token && hash) newEmployeeObj.password = hash;

    return Employee.update(newEmployeeObj, { where: { id: parseInt(employeeId) } })
        .then((result) => {
            if (result[0]) {
                return { message: 'Employee Updated Successfully', newToken };
            } else {
                return { message: 'Employee Not Updated. Either the Employee did not exist, or no changes were requested' };
            }
        })
        .catch(err => {
            throw APIError(err.status || 500, err.message || "Employee Update Failed", err);
        });
}

function deleteEmployee(employeeId) {
    return Employee.destroy({ where: { id: parseInt(employeeId) }, limit: 1 })
        .then((result) => {
            if (result) {
                return { message: "Employee Deleted Successfully" };
            } else {
                throw APIError(404, "Employee Not Found");
            }
        })
        .catch(err => {
            throw APIError(err.status || 500, err.message || "Employee Deletion Failed", err);
        });
}

module.exports = {
    createEmployee,
    getEmployeeInfo,
    getAllEmployees,
    updateEmployee,
    deleteEmployee
};