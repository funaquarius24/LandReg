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
        bool isCertified;
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
        string id;
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
        string[] assetList;   
    }

    struct landState {
        string[] ids;
    }

    mapping(string => landDetails) lands;
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
        uint id_uint = computeId(state,district,cadzone,plotNumber);
        string memory id = uint2str(id_uint);
        // require(adminStates[state].adminAddress != msg.sender && owner != msg.sender, "Only admins are allowed to perform this operation.");
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

    function uint2str(uint _i) internal pure returns (string memory _uintAsString) { 
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function editLandDocuments(
        string memory id,
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

        if(!(compareStrings(cofo, "") && compareStrings(rofoHash, ""))){
            lands[id].isCertified = true;
        }
        else{
            lands[id].isCertified = false;
        }

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
    function landInfoFull(string memory id) public view returns(
        string memory state,
        string memory district,
        string memory cadzone,
        uint plotNumber,
        uint plotSize,
        address currentOwner,
        uint marketValue,
        bool isAvailable,
        address requester,
        reqStatus requestStatus,
        bool isCertified ){
        landDetails memory lands_local = lands[id];
        require(lands_local.plotSize != 0 && lands_local.plotNumber != 0, "No land with this ID exists.");
        
        state = lands_local.state;
        district = lands_local.district;
        cadzone = lands_local.cadzone;
        plotNumber = lands_local.plotNumber;
        plotSize = lands_local.plotSize;
        currentOwner = lands_local.currentOwner;
        marketValue = lands_local.marketValue;
        isAvailable = lands_local.isAvailable;
        requester = lands_local.requester;
        requestStatus = lands_local.requestStatus;
        isCertified = lands_local.isCertified;
            
    }

    function ownerInfo(address wAddress) public view returns(
        string memory name,
        string memory gender,
        uint dob,
        string memory ownerAddress,
        string memory phone1,
        string memory phone2,
        string memory NIN,
        string memory email
    ) {
        require(!compareStrings(owners[wAddress].email, ""), "This owner does not exist.");
        ownerDetails memory tmpOwner = owners[wAddress];
        name = tmpOwner.name;
        gender = tmpOwner.gender;
        dob = tmpOwner.dob;
        ownerAddress = tmpOwner.ownerAddress;
        phone1 = tmpOwner.phone1;
        phone2 = tmpOwner.phone2;
        NIN = tmpOwner.NIN;
        email = tmpOwner.email;

    }

    function landDocumentsInfo(
        string memory id
    ) public returns (
        string memory cofo,
        uint cofoDate,
        string memory rofoHash,
        uint  rofoDate,
        bool isCertified
        ) {
        require(lands[id].plotSize != 0 && lands[id].plotNumber != 0, "No land with this ID exists.");

        landDetails memory lands_local = lands[id];

        // id = id;
        cofo = lands_local.cofo;
        cofoDate = lands_local.cofoDate;
        rofoHash = lands_local.rofoHash;
        rofoDate = lands_local.rofoDate;
        isCertified = lands_local.isCertified;

    }

    function landInfoStates(string memory state) public view returns(string[] memory state_ids){
        state_ids = landStates[state].ids;
    }
    
    //to view details of land for the buyer
    function landInfoBuyer(string memory id) public view returns(address,uint,bool,address,reqStatus){
        return(lands[id].currentOwner, lands[id].marketValue, lands[id].isAvailable, lands[id].requester, lands[id].requestStatus);
    }

    // to compute id for a land.
    function computeId(string memory state, string memory district, string memory cadzone, uint plotNumber) public pure returns(uint){
        return uint(keccak256(abi.encodePacked(state, district, cadzone, plotNumber)))%10000000000000;
    }

    // view the assets of the owner represented by this address
    function viewAssets(address wAddress)public view returns(string[] memory){
        return (profile[wAddress].assetList);
    }

    //push a request to the land owner
    function requstToLandOwner(string memory id) public {
        require(lands[id].isAvailable);
        lands[id].requester = msg.sender;
        lands[id].isAvailable = false;
        lands[id].requestStatus = reqStatus.pending; //changes the status to pending.
    }

    //viewing request for the lands
    function viewRequest(string memory property)public view returns(address){
        return(lands[property].requester);
    }
    //processing request for the land by accepting or rejecting
    function processRequest(string memory property,reqStatus status) public {
        require(lands[property].currentOwner == msg.sender);
        lands[property].requestStatus = status;
        if(status == reqStatus.reject){
            lands[property].requester = address(0);
            lands[property].requestStatus = reqStatus.Default;
        }
    }
    //availing lands for sale.
    function makeAvailable(string memory property)public{
        require(lands[property].currentOwner == msg.sender);
        lands[property].isAvailable=true;
    } 

    //buying the approved property
    function buyProperty(string memory property)public payable{
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
    function removeOwnership(address previousOwner,string memory id)private{
        uint index = findId(id,previousOwner);
        profile[previousOwner].assetList[index]=profile[previousOwner].assetList[profile[previousOwner].assetList.length-1];
        profile[previousOwner].assetList.pop();
    }
    //for finding the index of a perticular id
    function findId(string memory id,address user)public view returns(uint){
        uint i;
        for(i=0;i<profile[user].assetList.length;i++){
            // if(profile[user].assetList[i] == id)
            if(compareStrings(profile[user].assetList[i], id))
                return i;
        }
        return i;
    }

    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
}