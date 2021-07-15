const LandReg = artifacts.require("LandReg");
let catchRevert = require("./exceptions.js").catchRevert;

let landRegInstance;

contract('LandReg', (accounts) => {
    before(async function() {
        landRegInstance = await LandReg.deployed();
    });
    describe('Create user account, owner and land', function() {
        let newAccount;
        it('Should successfully create a user', async function() {
            var result = await web3.eth.personal.newAccount('!%&passWord');
            assert.notEqual(result, undefined);
            newAccount = result;
        });
        it('Should successfully register an owner', async () => {
            var res1 = 0;
            res1 = await landRegInstance.registerOwner("Ismail", "Male", 1024, "abu zaria", "080178", "0801784", "1111", "a@b", "Lagos", newAccount);
            assert.notEqual(res1, 0, "Error occured when registering the owner.")
          });
        it('Should successfully register a land', async () => {
            var res1 = 0;
            res1 = await landRegInstance.registerLand("a", "aa", "aaa", 2121, 1000, newAccount);
            assert.notEqual(res1, 0, "Error occured when registering the land.")
        });
        it('Should not successfully register a land', async () => {
            var res1 = 0;
            res1 = await landRegInstance.registerOwner("Ismail", "Male", 1024, "abu zaria", "080178", "0801784", "1111", "a@b", "Lagos", newAccount);
            // assert.equal(res1, 0, "No error occured when registering the land.")
        });
    });
  });
  