export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    // console.log("token: ", user.accessToken);
    if (user && user.accessToken) {
        return { 'Authorization': 'Bearer ' + user.accessToken, 'Content-Type': 'application/json' };
    } else {
        return {};
    }
}