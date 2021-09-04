import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    getAll,
    addAdmin
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    console.log("logging out");
    return { type: userConstants.LOGOUT };
}

function addAdmin(data) {
    console.log("addAdmin: ", data)
    if(!(data.name && data.email && data.phone && data.password && data.state && data.district)){
        return dispatch => {
            const compare_error = "Required fields are missing"
            // console.log(compare_error);
            dispatch(failure(compare_error));
            dispatch(alertActions.error(compare_error));
        }
    }
    return dispatch => {
        userService.addAdmin(data)
            .then(
                returnedData => dispatch(alertActions.success("Admin Successfully Added")),
                error => dispatch(alertActions.error(error))
            )
    }

    function request(data) { return { type: userConstants.ADD_ADMIN_REQUEST, data } }
    function success(data) { return { type: userConstants.ADD_ADMIN_SUCCESS, data } }
    function failure(error) { return { type: userConstants.ADD_ADMIN_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}