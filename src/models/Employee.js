const Sequelize = require('sequelize');
const APIError = require('../APIError');
let db = require('../services/mysql').getConnection();
const Promise = require('bluebird');

const Employee = module.exports = db.define('employee', {
	id: {
		type: Sequelize.DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	fname: {
		type: Sequelize.DataTypes.STRING,
		defaultValue: null
	},
	lname: {
		type: Sequelize.DataTypes.STRING,
		defaultValue: null
	}
},{
	timestamps: false
});

Employee.extractReturnableFields = function(data) {
	let output;
	if (Array.isArray(data)) {
		output = [];
		for (let i = 0; i < data.length; i++) {
			output.push(_extractReturnableFields(data[i]));
		}
	} else {
		output = _extractReturnableFields(data);
	}
	return output;
}

function _extractReturnableFields(employee) {
	const output = {
		id: employee.id,
		fname: employee.fname,
		lname: employee.lname
	};

	return output;
}

Employee.exists = function(employeeId) {
	return Employee.findById(employeeId)
		.then(employee => {
			if (!employee) {
				throw APIError(404, "Employee Not Found");
			}
			return !!employee;
		})
		.catch(err => {
			throw APIError(err.status || 500, err.message || "Operation Failed", err);
		});
}