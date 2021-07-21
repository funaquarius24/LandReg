// import config from 'config';
import { authHeader } from '../_helpers';
const apiUrl = 'http://localhost:4200'

export const searchService = {
    land_search_id,
    land_search_user
};

async function land_search_id(data){
    data.search_with_id = true;
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
    // if(Object.keys(search_result).length > 0){
    //     var search_result_keys = Object.keys(search_result);
    //     search_result_keys.forEach((element, index, array) => {
    //       console.log(Object.keys(element))
    //       console.log(array[index]);
    //       // properRows = createData(element.)
    //     });
    //   }
    return search_result;
}

async function land_search_user(data){
    data.search_with_id = false;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    const response = await fetch(`${apiUrl}/blockchain/searchLand`, requestOptions);
    console.log(response);
    const search_result = await handleResponse(response);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    return search_result;
}

function logout() {
    // remove user from local storage to log user out
    console.log("logout called in searchservice.");
    localStorage.removeItem('user');
}

function handleResponse(response) {
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
        else
            throw "Unknown error."
    });
}