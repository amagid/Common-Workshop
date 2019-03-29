const users = require('./users');
const validate = require('../../../middlewares/validate');
const validators = require('./validators');
const requirePermissionLevel = require('../../../middlewares/require-permission-level');
const respond = require('../../../middlewares/respond');

module.exports = function mountUsers(router) {

    router.post('/create',
        validate(validators.createUser),
        respond((req, res) => users.createUser(req.body, req.user)));

    router.get('/',
        validate(validators.getAllUsers),
        respond((req, res) => users.getAllUsers(req.query.includeInactive)));

    router.get('/:userId',
        validate(validators.getUserInfo),
        respond((req, res) => users.getUserInfo(req.params.userId)));

    router.patch('/:userId',
        validate(validators.updateUser),
        respond((req, res) => users.updateUser(req.params.userId, req.body)));

    router.delete('/:userId',
        validate(validators.deleteUser),
        respond((req, res) => users.deleteUser(req.params.userId, false)));

};