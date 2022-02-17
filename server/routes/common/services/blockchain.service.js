const Web3 = require('web3')
const LandReg = require('../../../../build/contracts/LandReg.json');
// import config from './config/config.json';

var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
web3.eth.defaultAccount = web3.eth.accounts[0];
var contractOptions = {from: web3.eth.accounts[0], gasPrise: '20000000000'};


var te = LandReg.networks;
const keys = Object.keys(te);

var contract_address = te[keys[0]].address;
var myContract = new web3.eth.Contract(LandReg.abi, contract_address, contractOptions);
// MyContract.setProvider(provider);
var results = {};

err = null;
(async () => {
    console.log("start waiting");
    var accounts = await web3.eth.getAccounts()
    .then((accounts) => {
        console.log("Connected!");
        myContract.getPastEvents('allEvents', {
            
            fromBlock: 0,
            toBlock: 'latest'
        }, function(error, events){ console.log(events); })
        .then(function(events){
            console.log(events) 
        });
    })
    .catch(function failureCallback(error) {
        err = "" + error;
        if(err.indexOf("on send()") !== -1){
            console.log("cannot open blockchain node");
            console.log(err)
        }
        else {
            console.log("Unknown error on blockchain node", error);
        }
      } );

    if(err == null){
        // app.locals.contractAccount = accounts[0];
        console.log(web3.eth.accounts[0]);
    }

})();



// connectWithRetry();


results.web3 = web3;
results.myContract = myContract;
// results.instance = deployed;
results.contractOptions = contractOptions;

exports.blockchainObj = results