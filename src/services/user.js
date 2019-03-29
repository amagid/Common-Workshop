const config = require('../../config').get();
const Employee = require('../models/Employee');
const Promise = require('bluebird');
const APIError = require('../APIError');

function createEmployee(userData, currentEmployee) {
    const { fname, lname, username, pass, role } = userData;
    const verificationToken = shortId.generate();
    if (currentEmployee.role !== "admin") {
        return Promise.reject(APIError(403, "Only Admins can create Employees"));
    }
    if (role && currentEmployee.role && currentEmployee.role !== "admin" && !isPermissionEqualOrHigher(role, currentEmployee.role)) {
        return Promise.reject(APIError(403, "You may not give a Employee more permission than you yourself have"));
    }
    return Promise.all([pass ? password.encrypt(pass) : Promise.resolve(null)])
        .spread((hash) => {
            return Employee.create({
                fname,
                lname,
                username,
                password: hash,
                role,
                token: verificationToken
            });
        })
        .spread((createdEmployee) => {
            return {
                message: "Employee Created Successfully",
                createdEmployeeId: createdEmployee.id
            };
        })
        .catch(err => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                throw APIError(400, 'Employeename Must Be Unique', { send: { username: 'NotUnique' } });
            }
            //TODO: More detailed error handling
            throw APIError(err.status || 500, err.message || "Employee Creation Failed", err);
        });
}

function getEmployeeInfo(userId) {
    return Employee.findById(userId, { paranoid: false })
        .then(user => {
            return Employee.extractReturnableFields(user);
        })
        .catch(err => {
            //TODO: More detailed error handling
            throw APIError(404, 'Employee Not Found', err);
        });
}

function getAllEmployees(includeInactive = false) {
    return Employee.findAll({ paranoid: !includeInactive })
        .then(users => {
            return Employee.extractReturnableFields(users);
        })
        .catch(err => {
            throw APIError(500, 'Employee Retrieval Failed', err);
        });
}

function updateEmployee(userId, data) {
    const { fname, lname, username, pass, oldPass } = data;
    let encryptPassword = pass ? password.encrypt(pass) : Promise.resolve(null);
    let loginPromise = pass ? login(username, oldPass) : Promise.resolve(null);
    return Promise.all([encryptPassword, loginPromise])
        .spread((hash, loginResult) => {
            let newEmployeeObj = {};
            if (fname) newEmployeeObj.fname = fname;
            if (lname) newEmployeeObj.lname = lname;
            if (username) newEmployeeObj.username = username;
            if (loginResult && loginResult.token && hash) newEmployeeObj.password = hash;

            return Promise.all([Employee.update(newEmployeeObj, { where: { id: parseInt(userId) }, paranoid: false }), loginResult && loginResult.token]);
        })
        .spread((result, newToken) => {
            if (result[0]) {
                return { message: 'Employee Updated Successfully', newToken };
            } else {
                return { message: 'Employee Not Updated. Either the Employee did not exist, or no changes were requested' };
            }
        })
        .catch(err => {
            //TODO: More detailed error handling
            throw APIError(err.status || 500, err.message || "Employee Update Failed", err);
        });
}

function deleteEmployee(userId, force = false) {
    return Promise.all([
        Employee.destroy({ where: { id: parseInt(userId) }, force, limit: 1 })
    ]).spread((result, jwtResult) => {
        if (result) {
            return [{ message: "Employee Deleted Successfully" }, jwtResult];
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