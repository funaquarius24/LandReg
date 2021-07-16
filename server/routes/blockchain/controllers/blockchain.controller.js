const blockchainModel = require('../models/blockchain.model');
// const crypto = require('crypto');

exports.insert = (req, res) => {
    if(!req.body){
        res.status(400).send("No Body");
    }
    console.log(req.body);
    blockchainModel.addAdmin(req.body).then((result) => {
        console.log("Insert result: ");
        console.log(result);
    })
}