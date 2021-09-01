const BlockchainController = require('./controllers/blockchain.controller');
// const UsersController = require('./controllers/users.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');

const config = require('../common/config/env.config');

const SU_ADMIN = config.permissionLevels.SU_ADMIN;
const ADMIN = config.permissionLevels.ADMIN;
const LAND_OWNER = config.permissionLevels.LAND_OWNER;

exports.routesConfig = function (app) {
    app.post('/blockchain/addAdmin', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        BlockchainController.insertAdmin
    ]);
    app.post('/blockchain/addOwner', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        BlockchainController.insertOwner
    ]);
    app.post('/blockchain/ownerInfo', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        BlockchainController.ownerInfo
    ])
    app.post('/blockchain/addLand', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        BlockchainController.insertLand
    ]);
    app.post('/blockchain/editLandDocuments', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        BlockchainController.editLandDocuments
    ]);
    app.post('/blockchain/searchLand', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        BlockchainController.searchLand
    ]);
};