// SPDX-License-Identifier: MIT

pragma solidity >=0.5.1 <= 0.8.6;

contract LandReg{
    address superAdmin;

    struct landDetails{
        string state;
        string district;
        string cadzone;
        uint256 plotNumber;
        uint256 plotSize;  // * 4 decimal places
        address payable currentOwner;
        // Land Documents
        string cofo;
        uint cofoDate;
        string rofoHash;
        uint rofoDate;
        // Buy and sell
        uint marketValue;
        bool isAvailable;
        address requester;
        reqStatus requestStatus; 
        uint id;
    }

    struct ownerDetails {
        string name;
        string gender;
        uint dob;
        string ownerAddress;
        string phone1;
        string phone2;
        string NIN;
        string email;
        address payable wAddress;
    }

    struct adminDetails {
        string name;
        string state;
        string district;
    }
    struct adminState {
        address adminAddress;
    }

    //request status
    enum reqStatus { Default, pending, reject, approved }

    //profile of a client
    struct profiles{
        uint[] assetList;   
    }

    struct landState {
        uint[] ids;
    }

    mapping(uint => landDetails) lands;
    mapping(string => landState) landStates; // Push land ids inside their respestive states
    address owner;
    mapping( address => adminDetails) admins;
    mapping(string => adminState) adminStates;
    mapping( address => profiles) profile;

    mapping( address => ownerDetails ) owners;
    
    //contract owner
    constructor() {
        owner = msg.sender;
        superAdmin = owner;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    //adding region admins
    function addAdmin( address admin, string memory name, string memory state, string memory district ) onlyOwner public {
        admins[admin].name = name;
        admins[admin].state = state;
        admins[admin].district = district;

        adminStates[state].adminAddress = admin;
    }

    function getAdmin(string memory state) public view returns(address){
        return adminStates[state].adminAddress;
    }

    //Registration of land details.
    function registerLand(
        string memory state,
        string memory district,
        string memory cadzone,
        uint plotNumber,
        uint plotSize,
        address payable wAddress
        ) public returns(bool) {
        require(adminStates[state].adminAddress == msg.sender || owner == msg.sender, "Only admins are allowed to perform this operation.");
        uint id = computeId(state,district,cadzone,plotNumber);
        require(lands[id].plotSize == 0 && lands[id].plotNumber == 0, "Land with this ID already exists.");
        lands[id].state = state;
        lands[id].district = district;
        lands[id].cadzone = cadzone;
        
        lands[id].plotNumber = plotNumber;
        lands[id].plotSize = plotSize;
        lands[id].currentOwner = wAddress;

        lands[id].id = id;
        landStates[state].ids.push(id);

        profile[wAddress].assetList.push(id);
        return true;
    }

    function editLandDOcuments(
        uint id,
        string memory cofo,
        uint cofoDate,
        string memory rofoHash,
        uint  rofoDate,
        string memory stateOfAdmin
    ) public returns (bool) {
        require(adminStates[stateOfAdmin].adminAddress == msg.sender || owner == msg.sender, "Only admins are allowed to perform this operation.");
        require(lands[id].plotSize != 0 && lands[id].plotNumber != 0, "No land with this ID exists.");

        lands[id].cofo = cofo;
        lands[id].cofoDate = cofoDate;
        lands[id].rofoHash = rofoHash;
        lands[id].rofoDate = rofoDate;

        return true;
    }

    function registerOwner(
        string memory name,
        string memory gender,
        uint dob,
        string memory ownerAddress,
        string memory phone1,
        string memory phone2,
        string memory NIN,
        string memory email,
        string memory stateOfAdmin,
        address payable wAddress
    ) onlyOwner public returns (bool){
        require(adminStates[stateOfAdmin].adminAddress == msg.sender || owner == msg.sender, "Only admins are allowed to perform this operation.");
        bytes32 emptyHash = keccak256("");
        require( keccak256(bytes(owners[wAddress].NIN)) == emptyHash || keccak256(bytes(owners[wAddress].email)) == emptyHash, "This account already exists.");

        owners[wAddress].name = name;
        owners[wAddress].gender = gender;
        owners[wAddress].dob = dob;
        owners[wAddress].ownerAddress = ownerAddress;
        owners[wAddress].phone1 = phone1;
        owners[wAddress].phone2 = phone2;
        owners[wAddress].NIN = NIN;
        owners[wAddress].email = email;
        owners[wAddress].wAddress = wAddress;

        return true;
    }

    //to view details of land for the owner
    function landInfoFull(uint id) public view returns(string memory,string memory,string memory,uint,uint,address,uint, bool,address,reqStatus){
        landDetails memory lands_local = lands[id];
        return(
            lands_local.state,
            lands_local.district,
            lands_local.cadzone,
            lands_local.plotNumber,
            lands_local.plotSize,
            lands_local.currentOwner,
            lands_local.marketValue,
            lands_local.isAvailable,
            lands_local.requester,
            lands_local.requestStatus
            );
    }
    
    //to view details of land for the buyer
    function landInfoBuyer(uint id) public view returns(address,uint,bool,address,reqStatus){
        return(lands[id].currentOwner, lands[id].marketValue, lands[id].isAvailable, lands[id].requester, lands[id].requestStatus);
    }

    // to compute id for a land.
    function computeId(string memory state, string memory district, string memory cadzone, uint plotNumber) public pure returns(uint){
        return uint(keccak256(abi.encodePacked(state, district, cadzone, plotNumber)))%10000000000000;
    }

    // view the assets of the owner represented by this address
    function viewAssets(address wAddress)public view returns(uint[] memory){
        return (profile[wAddress].assetList);
    }

    //push a request to the land owner
    function requstToLandOwner(uint id) public {
        require(lands[id].isAvailable);
        lands[id].requester = msg.sender;
        lands[id].isAvailable = false;
        lands[id].requestStatus = reqStatus.pending; //changes the status to pending.
    }

    //viewing request for the lands
    function viewRequest(uint property)public view returns(address){
        return(lands[property].requester);
    }
    //processing request for the land by accepting or rejecting
    function processRequest(uint property,reqStatus status) public {
        require(lands[property].currentOwner == msg.sender);
        lands[property].requestStatus = status;
        if(status == reqStatus.reject){
            lands[property].requester = address(0);
            lands[property].requestStatus = reqStatus.Default;
        }
    }
    //availing lands for sale.
    function makeAvailable(uint property)public{
        require(lands[property].currentOwner == msg.sender);
        lands[property].isAvailable=true;
    } 

    //buying the approved property
    function buyProperty(uint property)public payable{
        require(lands[property].requestStatus == reqStatus.approved);
        require(msg.value >= (lands[property].marketValue+((lands[property].marketValue)/10)));
        lands[property].currentOwner.transfer(lands[property].marketValue);
        removeOwnership(lands[property].currentOwner,property);
        lands[property].currentOwner=payable(msg.sender);
        lands[property].isAvailable=false;
        lands[property].requester = address(0);
        lands[property].requestStatus = reqStatus.Default;
        profile[msg.sender].assetList.push(property); //adds the property to the asset list of the new owner.
        
    }
    //removing the ownership of seller for the lands. and it is called by the buyProperty function
    function removeOwnership(address previousOwner,uint id)private{
        uint index = findId(id,previousOwner);
        profile[previousOwner].assetList[index]=profile[previousOwner].assetList[profile[previousOwner].assetList.length-1];
        profile[previousOwner].assetList.pop();
    }
    //for finding the index of a perticular id
    function findId(uint id,address user)public view returns(uint){
        uint i;
        for(i=0;i<profile[user].assetList.length;i++){
            if(profile[user].assetList[i] == id)
                return i;
        }
        return i;
    }
}