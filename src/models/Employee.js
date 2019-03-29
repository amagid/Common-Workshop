const Sequelize = require('sequelize');
const APIError = require('../APIError');
let db = require('../services/mysql').getConnection();
const Promise = require('bluebird');

const User = module.exports = db.define('user', {
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
	},
	createdAt: {
		type: Sequelize.DataTypes.DATE,
		defaultValue: null
	},
	updatedAt: {
		type: Sequelize.DataTypes.DATE,
		defaultValue: null
	},
	deletedAt: {
		type: Sequelize.DataTypes.DATE,
		defaultValue: null
	}
}, {
	paranoid: true
});

User.extractReturnableFields = function(data, internalOnly = false) {
	let output;
	if (Array.isArray(data)) {
		output = [];
		for (let i = 0; i < data.length; i++) {
			output.push(_extractReturnableFields(data[i], internalOnly));
		}
	} else {
		output = _extractReturnableFields(data, internalOnly);
	}
	return output;
}

function _extractReturnableFields(user, internalOnly) {
	const output = {
		id: user.id,
		fname: user.fname,
		lname: user.lname
	};
	if (user.deletedAt) {
		output.deletedAt = user.deletedAt;
	}

	return output;
}

User.findByUsername = function(username) {
    return User.findOne({ where: { username }})
        .then(user => {
            if (!user) {
                throw APIError(404, 'User Not Found');
            }
            return user;
        })
        .catch(err => {
            throw APIError(404, 'User Not Found');
        });
}

User.findByToken = function(token) {
    return User.findOne({ where: { token }})
        .then(user => {
            if (!user) {
                throw APIError(404, 'User Not Found');
            }
            return user;
        })
        .catch(err => {
            throw APIError(404, 'User Not Found');
        });
}

User.exists = function(userId) {
	return User.findById(userId)
		.then(user => {
			if (!user) {
				throw APIError(404, "User Not Found");
			}
			return !!user;
		})
		.catch(err => {
			throw APIError(err.status || 500, err.message || "Operation Failed", err);
		});
}