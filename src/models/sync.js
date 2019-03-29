const Employee = require('./Employee');

module.exports = sync;

function sync() {
    return Employee.sync()
}