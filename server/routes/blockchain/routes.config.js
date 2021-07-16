const UsersController = require('./controllers/blockchain.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');

const config = require('../common/config/env.config');

const SU_ADMIN = config.permissionLevels.SU_ADMIN;
const ADMIN = config.permissionLevels.ADMIN;
const LAND_OWNER = config.permissionLevels.LAND_OWNER;

exports.routesConfig = function (app) {
    app.post('/blockchain', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.insert
    ]);
};