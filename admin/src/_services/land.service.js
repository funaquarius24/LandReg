// import config from 'config';
import { authHeader } from '../_helpers';
const apiUrl = 'http://localhost:4200'

export const landService = {
    edit_details,
    apply_details,
    get_land_owner_info,
    get_land_cert_info,
    create_owner,
    create_land
};


// responsible for sending records
async function edit_details(data){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    // console.log("requestOptions: ", requestOptions.body);

    const response = await fetch(`${apiUrl}/blockchain/editLandDocuments`, requestOptions);
    // console.log(response);
    const edit_details_result = await handleResponse(response);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    // console.log("search_result", search_result);
    return edit_details_result;
}

// responsible for sending records
async function create_owner(data){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    // console.log("requestOptions: ", requestOptions.body);

    const response = await fetch(`${apiUrl}/users/addOwner`, requestOptions);
    // console.log(response);
    const create_owner_result = await handleResponse(response);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    // console.log("search_result", search_result);
    return create_owner_result;
}

// responsible for sending records
async function create_land(data){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    // console.log("requestOptions: ", requestOptions.body);

    const response = await fetch(`${apiUrl}/blockchain/addLand`, requestOptions);
    // console.log(response);
    const create_land_result = await handleResponse(response);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    // console.log("search_result", search_result);
    return create_land_result;
}

async function apply_details(data){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    // console.log("requestOptions: ", requestOptions.body);

    const response = await fetch(`${apiUrl}/blockchain/searchLand`, requestOptions);
    // console.log(response);
    const search_result = await handleResponse(response);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    console.log("search_result", search_result);
    return search_result;
}

async function get_land_owner_info(address_data){
    var data = {}
    data['wAddress'] = address_data;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    // console.log("requestOptions: ", requestOptions.body);

    const response = await fetch(`${apiUrl}/blockchain/ownerInfo`, requestOptions);
    // console.log(response);
    const land_owner_info_result = await handleResponse(response);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    console.log("land_owner_info_result", land_owner_info_result);
    // if(Object.keys(search_result).length > 0){
    //     var search_result_keys = Object.keys(search_result);
    //     search_result_keys.forEach((element, index, array) => {
    //       console.log(Object.keys(element))
    //       console.log(array[index]);
    //       // properRows = createData(element.)
    //     });
    //   }
    return land_owner_info_result;
}

async function get_land_cert_info(land_id){
    var data = {}
    data['land_id'] = land_id;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };


    const response = await fetch(`${apiUrl}/blockchain/documentsInfo`, requestOptions);
    // console.log(response);
    const land_cert_info_result = await handleResponse(response);
    console.log("land_cert_info_result", land_cert_info_result);
    return land_cert_info_result;
}


function logout() {
    // remove user from local storage to log user out
    console.log("logout called in searchservice.");
    localStorage.removeItem('user');
}

function handleResponse(response) {
    console.log("response: ", response);
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                console.log("logging out in searchservice");
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            console.log("Error received at handleresponse: ", error);
            return Promise.reject(error);
        }

        return data;
    })
    .catch(error => {
        if (response.status == "404"){
            throw "404 error.";
        }
        else if(response.ok){
            return true
        }
        else
            throw "Unknown error."
    });
}