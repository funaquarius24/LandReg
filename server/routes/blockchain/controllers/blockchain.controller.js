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
        var err = error + "";
        err = err.split("\n"); 
        console.log("err: ", err);
        if (req.isNext){

            throw error;
        }
        else {
            res.status(500).send(error);
            err = "Failed to insert to blockchain. " + err
            console.log(err);
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
        var err = error + "";
        err = err.split("\n"); 
        console.log("err: ", error);
        if (req.isNext){
            throw error;
        }
        else {
            err = "Failed to register land to blockchan. " + error;
            res.status(303).send(err);
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
        // console.log(error);
        
        if (req.isNext){

            res.status(303);
            throw error;
        }
        else {
            var err = error + "";
            err = err.split("\n"); 
            console.log("err: ", err);
            err = "error for blockchain editLandDocuments: " + err;
            res.status(303).send(err);
        }
    })
    
}

exports.searchLand = (req, res, next) => {
    if(!req.body){
        console.log("No body");
        res.status(400).send("No Body");
        throw new Error("No body.")
    }
    var data = req.body;
    data.senderAddress = req.jwt.wAddress;
    return blockchainModel.searchLand(data)
    .then((result) => {
        
        if (req.isNext){

            res.status(200);
            return result; 
        }
        else {
            res.status(200).send("Request Successful.");
        }
               
    })
    .catch((error) => {
        if (req.isNext){

            res.status(404);
            throw error;
        }
        else {
            var err = error + "";
            err = err.split("\n"); 
            console.log("err: ", err);
            err = "error for blockchain editLandDocuments: " + err;
            res.status(404).send(err);
        }
    })
    
}