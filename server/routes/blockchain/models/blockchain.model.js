const blockchain = require('../../common/services/blockchain.service').blockchainObj;
const usersmodel = require('../../users/models/users.model')

exports.addAdmin = (data) => {
  return  blockchain.myContract.methods.addAdmin(
    data.newAddress, 
    data.name,
		data.state,
    data.district
	).send({from: data.senderAddress, gas: 2000000})
	.then((receipt) => {
    // console.log(receipt);
		return receipt;
	})
  .catch(function failureCallback(error) {
    err = "" + error;
    console.log("Error: ");
    console.log(error);
    return error;
  } );
}

exports.registerOwner = (data) => {
  console.log("data: ", data);
  return  blockchain.myContract.methods.registerOwner(
    data.name,
    data.gender,
    data.dob,
		data.ownerAddress,
    data.phone1,
    data.phone2,
    data.NIN,
    data.email,
    data.stateOfAdmin,
    data.newAddress
	).send({from: data.senderAddress, gas: 2000000})
	.then((receipt) => {
    // console.log(receipt);
		return receipt;
	})
  .catch(function failureCallback(error) {
    err = "" + error;
    // console.log("Error: ");
    // console.log(error);
    return error;
  } );
}

exports.createAccount = () => {
  // console.log("create account!")
  return blockchain.web3.eth.personal.newAccount('!@superpassword')
  .then((result) => {
    // console.log("result: ", result);
    return result;
  });
}

exports.registerLand = (data) => {
  
  return usersmodel.findByEmail(data.email)
  .then((result) => {
    data.ownerWalletAddress = result[0].key;
    // console.log("ownerWalletAddress result: ", result[0].key);
  })
  .then(() =>{
    return blockchain.myContract.methods.registerLand(
      data.state, 
      data.district,
      data.cadzone,
      data.plotNumber,
      data.plotSize,
      data.ownerWalletAddress
    ).send({from: data.senderAddress, gas: 2000000})
    .then(function(receipt){
      return receipt;
    })
    .catch(error => {
      err = "Add Land " + error;
      // console.log("Error registering land.");
      // console.log(error);
      throw err;
    })
  })
    
}

exports.editLandDocuments = (data) => {
  console.log("editLandDocuments: ", data);
  const edit_land_func = (data) => {
    return blockchain.myContract.methods.editLandDOcuments(
      data.land_id, 
      data.cofo,
      data.cofoDate,
      data.rofoHash,
      data.rofoDate,
      data.stateOfAdmin
    ).send({from: data.senderAddress, gas: 2000000})
    .then(function(receipt){
        return receipt;
    })
    .catch(error => {
      console.log(error);
      throw error;
    })
  }
  var info_promise;
  if(data.land_id === undefined || data.land_id == ""){
    return blockchain.myContract.methods.computeId(
      data.state,
      data.district,
      data.cadzone,
      data.plotNumber
    )
    .call({from: data.senderAddress, gas: 2000000})
    .then((result) => {
      console.log("contract call id: ", result);
      data.land_id = result;
      return edit_land_func(data);
    })
    .then((result) => {
      data.receipt = result;
      return data;
    })
    .catch(error => {
      err = "" + error;
      console.log("Error: ");
      console.log(error);
      throw error;
    })
  }
  else {
    return edit_land_func(data);
  }
  
}