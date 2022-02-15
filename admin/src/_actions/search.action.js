import { searchConstants } from '../_constants';
import { searchService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const searchActions = {
    land_search_id,
    land_search_user
};

function land_search_id(data) {
    return dispatch => {
        dispatch(request(data));
        // console.log("data: ", data);

        searchService.land_search_id(data) 
            .then(
                search_result => { 
                    dispatch(success(search_result));
                    history.push('/dashboard');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(data) { return { type: searchConstants.SEARCH_REQUEST, data } }
    function success(search_result) { return { type: searchConstants.SEARCH_SUCCESS, search_result } }
    function failure(error) { return { type: searchConstants.SEARCH_FAILURE, error } }
}

function land_search_user(data) {
    return dispatch => {
        dispatch(request(data));

        searchService.land_search_user(data)
            .then(
                search_result => { 
                    dispatch(success(search_result));
                    history.push('/dashboard');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(data) { return { type: searchConstants.SEARCH_REQUEST, data } }
    function success(search_result) { return { type: searchConstants.SEARCH_SUCCESS, search_result } }
    function failure(error) { return { type: searchConstants.SEARCH_FAILURE, error } }
}

