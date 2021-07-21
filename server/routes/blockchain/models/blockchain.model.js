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
      throw error;
    })
  })
    
}

exports.editLandDocuments = (data) => {
  console.log("editLandDocuments: ", data);
  const edit_land_func = (data) => {
    return blockchain.myContract.methods.editLandDocuments(
      data.land_id + "", 
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
      console.log("error for blockchain editlanddocuments: ", error);
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

exports.searchLand = (data) => {
  console.log("data: ", data);
  const assetsInfo = {};
  if(data.search_with_id){
    if(data.id){
      console.log("Should search with ID!", data.id);
      return blockchain.myContract.methods.landInfoFull(data.id + "")
            .call({from: data.senderAddress, gas: 2000000})
            .then(result => {
              return result;
            })
            .catch(error => {
              console.log("Error search id: ", error);
              throw error;
            })
    }
    else if (data.state && !(data.cadzone && data.district && data.plotNumber)){
        console.log("Should search using state information!");
        return blockchain.myContract.methods.landInfoStates(data.state)
            .call({from: data.senderAddress, gas: 2000000})
            .then(result =>  {
              console.log("result of landInfoStates: ", result);
              return result;
            })
            .then(results => {
              // console.log("viewAssets result for state: ", results);
              for(var i = 0; i < results.length; i++){
                assetsInfo[results[i]] = 
                  blockchain.myContract.methods.landInfoFull(results[i])
                  .call({from: data.senderAddress, gas: 2000000})
                  .then(result => {
                    return Promise.resolve(result);
                  })
                  .catch(error => {
        
                    console.log("Error getting info with id for state info.: ");
                    throw error;
                  });
              }

              // console.log("assetsInfo in for: ", assetsInfo);

              return assetsInfo;
            })
            .then((results) => {
              var values = Object.keys(results).map(function(key){
                return results[key];
              });
              return Promise.all(values); 
              
            })
            .then(results => {
              var assetsInfoKeys = Object.keys(assetsInfo);
              for (var i = 0; i < results.length; i++) {
                assetsInfo[assetsInfoKeys[i]] = results[i];
              }
              return assetsInfo;
            })
            .catch(error => {
              console.log("Error search with state: ", error);
              throw error;
            })
    }
    else if (data.state && (data.cadzone && data.district && data.plotNumber)){
        console.log("Should search using all information!");
        return blockchain.myContract.methods.computeId(
          data.state,
          data.district,
          data.cadzone,
          data.plotNumber
        )
        .call({from: data.senderAddress, gas: 2000000})
        .then((result) => {
          data.land_id = result;
          console.log("Result of computeID: ", result);
          return blockchain.myContract.methods.landInfoFull(data.land_id)
            .call({from: data.senderAddress, gas: 2000000})
            .then(result =>  {
              console.log("result of searching using all info: ", result);
              return result;
            })
            .catch(error => {
              console.log("Error search with sate: ", error);
              throw error;
            })
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

    }else{
        console.log("No enough information to search!");
        throw "No enough information to search!";
    }

  }
  else{
    if (data.key) {
      console.log("Should search using key information!");
      return blockchain.myContract.methods.viewAssets(data.key)
        .call({from: data.senderAddress, gas: 2000000})
        .then(results => {
          // console.log("viewAssets result for key: ", results);
          results.forEach(element => {
            blockchain.myContract.methods.landInfoFull(element)
            .call({from: data.senderAddress, gas: 2000000})
            .then(result =>  {
              assetsInfo[element] = result;
            })
            .catch(error => {

              console.log("Error getting info wth id.: ");
              throw error;
            });
            
          });
        })
        .then(() => {
          return assetsInfo;
        })
        .catch(error => {
          console.log("Error occured while searching with key.");
          throw error;
        })
      
    } else if(data.email) {
      console.log("Should search using email information!");
      return usersmodel.findByEmail(data.email)
      .then((result) => {
        data.ownerWalletAddress = result[0].key;
        // console.log("ownerWalletAddress result: ", result[0].key);
        return data.ownerWalletAddress;
      })
      .then(result => {
        return blockchain.myContract.methods.viewAssets(result)
          .call({from: data.senderAddress, gas: 2000000})
      })
      .then(result =>  {
        console.log("result of viewAssets: ", result);
        return result;
      })
      .then(results => {
        // console.log("viewAssets result for state: ", results);
        for(var i = 0; i < results.length; i++){
          assetsInfo[results[i]] = 
            blockchain.myContract.methods.landInfoFull(results[i])
            .call({from: data.senderAddress, gas: 2000000})
            .then(result => {
              return Promise.resolve(result);
            })
            .catch(error => {
  
              console.log("Error getting info with id for email info.: ");
              throw error;
            });
        }

        // console.log("assetsInfo in for: ", assetsInfo);

        return assetsInfo;
      })
      .then((results) => {
        var values = Object.keys(results).map(function(key){
          return results[key];
        });
        return Promise.all(values); 
        
      })
      .then(results => {
        var assetsInfoKeys = Object.keys(assetsInfo);
        for (var i = 0; i < results.length; i++) {
          assetsInfo[assetsInfoKeys[i]] = results[i];
        }
        console.log("assetsInfo: ", assetsInfo);
        return assetsInfo;
      })
      .catch(error => {
        console.log("error occured at usage of email");
        throw error;
      })
    }
    else{
      console.log("No enough information to search!");
        throw "No enough information to search!";
    }
  }
    
}

