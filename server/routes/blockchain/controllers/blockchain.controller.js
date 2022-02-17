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
        console.log(data);
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

exports.ownerInfo = (req, res, next) => {
    if(!req.body){
        console.log("No body");
        res.status(400).send("No Body");
        throw new Error("No body.")
    }
    var data = req.body;
    console.log("controller data: ", data);
    data.senderAddress = req.jwt.wAddress;
    return blockchainModel.ownerInfo(data)
    .then((result) => {
        
        if (req.isNext){

            res.status(200);
            return result; 
        }
        else {
            // res.result = result;
            console.log("result: ", result);
            res.status(200).send(result);
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
            err = "error for blockchain ownerInfo: " + err;
            res.status(404).send(err);
        }
    })
    
}

exports.documentsInfo = (req, res, next) => {
    if(!req.body){
        console.log("No body");
        res.status(400).send("No Body");
        throw new Error("No body.")
    }
    var data = req.body;
    data.senderAddress = req.jwt.wAddress;
    return blockchainModel.landDocumentsInfo(data)
    .then((result) => {
        
        if (req.isNext){

            res.status(200);
            return result; 
        }
        else {
            // res.result = result;
            console.log("result: ", result);
            res.status(200).send(result);
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
            err = "error for blockchain documentsInfo: " + err;
            res.status(404).send(err);
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
    console.log("controller data: ", data);
    data.senderAddress = req.jwt.wAddress;
    return blockchainModel.searchLand(data)
    .then((result) => {
        
        if (req.isNext){

            res.status(200);
            return result; 
        }
        else {
            // res.result = result;
            console.log("result: ", result);
            res.status(200).send(result);
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