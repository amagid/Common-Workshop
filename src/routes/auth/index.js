const auth = require('./auth');
const validate = require('../../middlewares/validate');
const validators = require('./validators');
const requirePermissionLevel = require('../../middlewares/require-permission-level');
const respond = require('../../middlewares/respond');

module.exports = function mountAuth(router) {
    router.post('/',
        validate(validators.login), 
        respond((req, res) => auth.login(req.body.username, req.body.password)));
    
    router.post('/verify-jwt',
        respond((req, res) => auth.verifyJWT(req.user)));
    
    router.post('/request-password-reset',
        requirePermissionLevel.user,
        validate(validators.requestPasswordReset),
        respond((req, res) => auth.requestPasswordReset(req.body.username)));

    router.get('/verify-token',
        requirePermissionLevel.user,
        validate(validators.verifyToken),
        respond((req, res) => auth.verifyToken(req.query.token, req.query.type)));

    router.patch('/complete-password-reset',
        requirePermissionLevel.user,
        validate(validators.completePasswordReset),
        respond((req, res) => auth.completePasswordReset(req.query.token, req.body.newPassword)));

    router.patch('/complete-signup',
        requirePermissionLevel.user,
        validate(validators.completeSignup),
        respond((req, res) => auth.completeSignup(req.body.token, req.body)));

    router.patch('/update-password/self',
        requirePermissionLevel.user,
        validate(validators.updateOwnPassword),
        respond((req, res) => auth.updatePassword(req.user.id, req.body.oldPass, req.body.newPass, req.body.newPassConfirm)));

    router.patch('/update-password/:userId',
        requirePermissionLevel.admin,
        validate(validators.updatePassword),
        respond((req, res) => auth.updatePassword(req.params.userId, req.body.oldPass, req.body.newPass, req.body.newPassConfirm)));
};