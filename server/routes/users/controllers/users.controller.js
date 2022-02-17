const UserModel = require('../models/users.model');
const crypto = require('crypto');
const config = require('../../common/config/env.config');
const BlockchainController = require('../../blockchain/controllers/blockchain.controller');

const SU_ADMIN = config.permissionLevels.SU_ADMIN;
const ADMIN = config.permissionLevels.ADMIN;
const LAND_OWNER = config.permissionLevels.LAND_OWNER;

exports.insert = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    if(!req.body.permissionLevel)
       req.body.permissionLevel = 1;
    UserModel.findByEmail(req.body.email)
        .then((result) => {
            if(result.length == 0){
                UserModel.createUser(req.body)
                    .then((result) => {
                        res.status(201).send({id: result._id});
                    });
            }
            else{
                res.status(409).send("User already exists.");
            }
        })
    // if (tmpResult){
    //     res.status(409).send(tmpResult, " Email already exists.");
    // }
    
};

exports.insertAdmin = (req, res, next) => {
    console.log("insertAdmin reached!!!")
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    if(!req.body.permissionLevel)
       req.body.permissionLevel = 4;
    UserModel.findByEmail(req.body.email)
        .then((result) => {
            if(result.length == 0)
            {
                if (req.body.lastName.length !== 0){
                    req.body.name = req.body.name + " " + req.body.lastName;
                }
                return result;
            }
            else{
                res.error = "User already exists.";
                res.status(409).send("User already exists.");
                throw new Error(res.error);
            }
        })
        .then((result) => {
            req.isNext = true;
            var result = BlockchainController.insertAdmin(req, res, next);
            return result;
        })
        .then((blockchainResult) => {
            
            // console.log("result users:  ", blockchainResult);
            if (blockchainResult === undefined | blockchainResult.transactionHash === undefined){
                res.status(403).send("Failed to add to blockchain");
                throw new Error("Failed to add to blockchain.");
            }
            // console.log("req.body: ", req.body);
            req.body.key = req.body.newAddress;
            UserModel.createUser(req.body)
                .then((dbResult) => {
                    // console.log("dbResult: ", dbResult);
                    // console.log("newAddress: ", res.newAddress);
                    res.status(201).send({id: dbResult._id, newAddress: res.newAddress});
                });

        })
        .catch((error) => {
            console.log("Error: User already exists.", error)
        })
    
};

exports.insertOwner = (req, res, next) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    if(!req.body.permissionLevel)
       req.body.permissionLevel = 1;
    UserModel.findByEmail(req.body.email)
        .then((result) => {
            if(result.length == 0)
                return result;
            else{
                res.error = "User already exists.";
                res.status(409).send("User already exists.");
                throw new Error(res.error);
            }
        })
        .then((result) => {
            req.isNext = true;
            // console.log("req.body: ", req.body);
            var result = BlockchainController.insertOwner(req, res, next);
            return result;
        })
        .then((blockchainResult) => {
            
            // console.log("result users:  ", blockchainResult);
            if (blockchainResult === undefined | blockchainResult.transactionHash === undefined){
                res.status(403).send("Failed to add to blockchain");
                throw new Error("Failed to add to blockchain.");
            }
            // console.log("req.body: ", req.body);
            req.body.key = req.body.newAddress;
            UserModel.createUser(req.body)
                .then((dbResult) => {
                    // console.log("dbResult: ", dbResult);
                    // console.log("newAddress: ", res.newAddress);
                    res.status(201).send({id: dbResult._id, newAddress: res.newAddress});
                });

        })
        .catch((error) => {
            console.log("Error: ", error);
        })
    
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    UserModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    UserModel.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.patchById = (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    UserModel.patchUser(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    UserModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
};