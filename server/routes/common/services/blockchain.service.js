const Web3 = require('web3')
var contract = require("@truffle/contract");
const LandReg = require('../../../../build/contracts/LandReg.json');

// const  = require('../../build/contracts/LandReg.json');
// const config = require('./config/config.json');

var provider = new Web3.providers.HttpProvider("http://localhost:8545");
var web3 = new Web3(provider)

var MyContract = contract(LandReg);

web3.eth.defaultAccount = web3.eth.accounts[0];
var contractOptions = {from: web3.eth.accounts[0], gasPrise: '20000000000'};
// var myContract = new web3.eth.Contract(LandReg.abi, config.contract_address, contractOptions);


MyContract.setProvider(provider);

var deployed;

const connectWithRetry = async () => {
    try{
        var err;
        var instance = await MyContract.deployed();
        deployed = instance;
        // console.log(instance);

        // var res = await instance.viewAssets();
        console.log("connected to blockchain node");
    }
    catch(error){
        console.error("unable to connect to blockchain");
        console.log(error)
    }
    finally{
        setTimeout(connectWithRetry, 10000);
    }
};

connectWithRetry();

var results = {};
results.web3 = web3;
results.myContract = MyContract;
results.deployed = deployed;


exports.blockchainObj = results