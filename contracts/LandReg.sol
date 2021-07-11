pragma solidity >=0.4.21 <0.7.4;

contract LandReg{
    address superAdmin;

    struct landDetails{
        string state;
        string district;
        string cadzone;
        uint256 plotNumber;
        uint256 plotSize;  // * 4 decimal places
        address payable currentOwner;
        uint marketValue;
        bool isAvailable;
        address requester;
        reqStatus requestStatus; 
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
    }

    //request status
    enum reqStatus {Default,pending,reject,approved}

    enum ownerType {organization, individual}

    //profile of a client
    struct profiles{
        uint[] assetList;   
    }

    mapping( uint => landDetails ) lands;
    address owner;
    mapping( string => address) admins;
    mapping( address => profiles) profile;

    mapping( address => ownerDetails ) owners;
    
    //contract owner
    constructor() public {
        owner = msg.sender;
        superAdmin = owner;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    //adding region admins
    function addAdmin( address admin, string memory state ) onlyOwner public {
        admins[state] = admin;
    }
    //Registration of land details.
    function registerLand(
        string memory state,
        string memory district,
        string memory cadzone,
        uint32 plotSize,
        string memory plotNumber,
        address payable ownerAddress,
        uint id
        ) public returns(bool) {
        require(admins[state] == msg.sender || owner == msg.sender, "Only admins are allowed to perform this operation.");
        require(lands[id].plotSize == 0 && lands[id].state == "", "Land with this ID already exists.");
        lands[id].state = state;
        lands[id].district = district;
        lands[id].cadzone = cadzone;
        
        lands[id].plotNumber = plotNumber;
        lands[id].plotSize = plotSize;
        lands[id].currentOwner = ownerAddress;

        profile[ownerAddress].assetList.push(id);
        return true;
    }

    function registerOwner(
        string memory name,
        string memory gender,
        uint dob,
        string memory ownerAddress,
        string memory phone
    ) onlyOwner public view returns (bool){
        
    }

    //to view details of land for the owner
    function landInfoOwner(uint id) public view returns(string memory,string memory,string memory,bool,address,reqStatus){
        return(
            lands[id].state,
            lands[id].district,
            lands[id].cadzone,
            lands[id].plotNumber,
            lands[id].plotSize,
            lands[id].currentOwner,
            lands[id].marketValue,
            lands[id].isAvailable;
            lands[id].requester;
            lands[id].requestStatus; 
            );
    }
    
    //to view details of land for the buyer
    function landInfoUser(uint id) public view returns(address,uint,bool,address,reqStatus){
        return(lands[id].currentOwner,lands[id].marketValue,lands[id].isAvailable,lands[id].requester,lands[id].requestStatus);
    }

    // to compute id for a land.
    function computeId(string memory state,string memory district,string memory region,uint surveyNumber) public pure returns(uint){
        return uint(keccak256(abi.encodePacked(state,district,region,surveyNumber)))%10000000000000;
    }

    //push a request to the land owner
    function requstToLandOwner(uint id) public {
        require(lands[id].isAvailable);
        lands[id].requester=msg.sender;
        lands[id].isAvailable=false;
        lands[id].requestStatus = reqStatus.pending; //changes the status to pending.
    }
    //will show assets of the function caller 
    function viewAssets()public view returns(uint[] memory){
        return (profile[msg.sender].assetList);
    }
    //viewing request for the lands
    function viewRequest(uint property)public view returns(address){
        return(lands[property].requester);
    }
    //processing request for the land by accepting or rejecting
    function processRequest(uint property,reqStatus status)public {
        require(lands[property].currentOwner == msg.sender);
        lands[property].requestStatus=status;
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
        lands[property].currentOwner=msg.sender;
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