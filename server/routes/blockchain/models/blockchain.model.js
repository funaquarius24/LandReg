const blockchain = require('../../common/services/blockchain.service').blockchainObj;

exports.addAdmin = (data) => {
  console.log("contractOptions:");
  console.log(blockchain.contractOptions);
  return  blockchain.instance.addAdmin(
		data.adminAddress, 
    data.name,
		data.state,
    data.district
	).send(blockchain.contractOptions)
	.then(function(receipt){
		return receipt;
	})
  .catch(function failureCallback(error) {
    err = "" + error;
    console.log(error);
    } );
}

exports.registerLand = (data) => {
    blockchain.myContract.methods.registerLand(
		data.name, 
        data.gender,
        data.dob,
        data.ownerAddress,
        data.phone,
        data.NIN
	).send({from: blockchain.myContract.contractAccount, gas: 2000000})
	.then(function(receipt){
		return receipt;
	});
}

exports.registerOwner = (data) => {
    blockchain.myContract.methods.registerOwner(
		data.name, 
        data.gender,
        data.dob,
        data.ownerAddress,
        data.phone,
        data.NIN
	).send({from: blockchain.myContract.contractAccount, gas: 2000000})
	.then(function(receipt){
		return receipt;
	});
}

exports.registerOwner = (data) => {
    blockchain.myContract.methods.registerOwner(
		data.name, 
        data.gender,
        data.dob,
        data.ownerAddress,
        data.phone,
        data.NIN
	).send({from: blockchain.myContract.contractAccount, gas: 2000000})
	.then(function(receipt){
		return receipt;
	});
}

exports.registerLand = (data) => {
    blockchain.myContract.methods.registerLand(
		data.state, 
        data.district,
        data.region,
        data.cadzone,
        data.ownerAddress,
        data.marketValue,
        data.id
	).send({from: data.sender, gas: 2000000})
	.then(function(receipt){
		return receipt;
	});
}

