const blockchainModel = require('../models/blockchain.model');
// const crypto = require('crypto');

exports.insertAdmin = (req, res, next) => {
    if(!req.body){
        console.log("No body");
        res.status(400).send("No Body");
        throw new Error("No body.")
    }
    var data = req.body;
    data.senderAddress = req.jwt.wAddress;
    return blockchainModel.createAccount()
    .then((result) => {
        data.newAddress = result;
        
    })
    .then(() => {
        return blockchainModel.addAdmin(data)
    })
    .then((result) => {
        
        if (req.isNext){

            res.status(201);
            req.body.newAddress = data.newAddress;
            return result; 
        }
        else {
            res.status(201).send("inserted to blockchain");
        }
               
    })
    .catch((error) => {
        console.log(error);
        throw error;
    })
    
}

exports.insertOwner = (req, res, next) => {
    if(!req.body){
        console.log("No body");
        res.status(400).send("No Body");
        throw new Error("No body.")
    }
    var data = req.body;
    data.senderAddress = req.jwt.wAddress;
    return blockchainModel.createAccount()
    .then((result) => {
        data.newAddress = result;
        
    })
    .then(() => {
        // console.log("req.body: ", data);
        return blockchainModel.registerOwner(data)
    })
    .then((result) => {
        
        if (req.isNext){

            res.status(201);
            req.body.newAddress = data.newAddress;
            return result; 
        }
        else {
            res.status(201).send("inserted to blockchain");
        }
               
    })
    .catch((error) => {
        console.log(error);
        if (req.isNext){

            throw error;
        }
        else {
            res.status(500).send(error);
        }
        
    })
    
}

exports.insertLand = (req, res, next) => {
    if(!req.body){
        console.log("No body");
        res.status(400).send("No Body");
        throw new Error("No body.")
    }
    var data = req.body;
    data.senderAddress = req.jwt.wAddress;
    return blockchainModel.registerLand(data)
    .then((result) => {
        
        if (req.isNext){

            res.status(201);
            req.body.newAddress = data.newAddress;
            return result; 
        }
        else {
            res.status(201).send("Inserted to blockchain.");
        }
               
    })
    .catch((error) => {
        console.log(error);
        if (req.isNext){
            throw error;
        }
        else {
            res.status(303).send("Failed to register land to blockchan.");
        }
        
    })
    
}

exports.editLandDocuments = (req, res, next) => {
    if(!req.body){
        console.log("No body");
        res.status(400).send("No Body");
        throw new Error("No body.")
    }
    var data = req.body;
    data.senderAddress = req.jwt.wAddress;
    return blockchainModel.editLandDocuments(data)
    .then((result) => {
        
        if (req.isNext){

            res.status(201);
            return result; 
        }
        else {
            res.status(201).send("inserted to blockchain");
        }
               
    })
    .catch((error) => {
        console.log(error);
        throw error;
    })
    
}