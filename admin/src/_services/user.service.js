// import config from 'config';
import { authHeader } from '../_helpers';
const apiUrl = 'http://localhost:4200'

export const userService = {
    login,
    logout,
    getAll
};

async function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    const response = await fetch(`${apiUrl}/auth`, requestOptions);
    console.log(response);
    const user = await handleResponse(response);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));
    return user;
}

function logout() {
    // remove user from local storage to log user out
    console.log("logout called removeItem");
    localStorage.removeItem('user');
}

function getAll() {
    console.log("getAll called");
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                console.log("logging out in userservice");
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}