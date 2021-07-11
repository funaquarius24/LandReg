const blockchain = require('../../common/services/blockchain.service').blockchainObj;

exports.addAdmin = (data) => {
    blockchain.myContract.methods.addAdmin(
		data.admin, 
		data.region
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

