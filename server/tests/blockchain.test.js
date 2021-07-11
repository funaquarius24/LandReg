const Web3 = require('web3')
const LandReg = require('../../build/contracts/LandReg.json');
// const config = require('./config/config.json');
const contract = require("@truffle/contract");

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
console.log(web3.eth == undefined);
web3.eth.defaultAccount = web3.eth.getAccounts()[0];
var contractOptions = {from: web3.eth.accounts[0], gasPrise: '20000000000'};
// var myContract = new web3.eth.Contract(LandReg.abi, config.contract_address, contractOptions);


var MyContract = contract({LandReg});
MyContract.setProvider(web3);

var deployed;


describe('Post users Endpoint', () => {
    it('try access the blockchain', async () => {
        var instance = await MyContract.deployed();
        deployed = instance;
        // console.log(instance);
        var res = await instance.viewAssets();
        // console.log(res);

        expect(Array.isArray(res)).toBe(true);
        
        
    } )
})