const Promise = require('bluebird');
const APIError = require('../../../APIError');
const users = require('../../../services/user');

module.exports = {
    createUser,
    getUserInfo,
    getAllUsers,
    updateUser,
    deleteUser
};

function createUser(userData, currentUser) {
    return users.createUser(userData, currentUser);
}

function getUserInfo(userId) {
    return users.getUserInfo(userId);
}

function getAllUsers(includeInactive = false) {
    return users.getAllUsers(includeInactive);
}

function updateUser(userId, data) {
    return users.updateUser(userId, data);
}

function deleteUser(userId, force) {
    return users.deleteUser(userId, force);
}