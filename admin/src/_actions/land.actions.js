import { landConstants } from '../_constants';
import { landService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const landActions = {
    land_details,
    land_info,
    land_id_selected
};

function land_info(data) {
    return dispatch => {
        dispatch(request(data));
        // console.log("data: ", data);

        landService.land_info(data)
            .then(
                land_owner_result => { 
                    dispatch(success(land_owner_result));
                    history.push('/dashboard');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(data) { return { type: landConstants.LAND_OWNER_REQUEST, data } }
    function success(land_owner_result) { return { type: landConstants.LAND_OWNER_SUCCESS, land_owner_result } }
    function failure(error) { return { type: landConstants.LAND_OWNER_FAILURE, error } }
}

function land_details(data) {
    return dispatch => {
        dispatch(request(data));
        // console.log("data: ", data);

        landService.land_details(data)
            .then(
                land_owner_result => { 
                    dispatch(success(land_owner_result));
                    history.push('/dashboard');
                },
                error => {
                    if(typeof error === 'string' || error instanceof String){
                        // console.log("error: ", error);
                        dispatch(failure(error));
                        dispatch(alertActions.error(error));
                    }else{
                        dispatch(failure(error.name + error.message));
                        dispatch(alertActions.error(error.message));
                    }
                    
                }
            );
    };

    function request(data) { return { type: landConstants.LAND_OWNER_REQUEST, data } }
    function success(land_owner_result) { return { type: landConstants.LAND_OWNER_SUCCESS, land_owner_result } }
    function failure(error) { return { type: landConstants.LAND_OWNER_FAILURE, error } }
}

function land_id_selected(data) {



    return dispatch => {
        dispatch(save(data));
        // console.log('land curr owner: ', data['land_info']['currentOwner']);

        landService.get_land_owner_info(data['land_info']['currentOwner'])
            .then(
                land_owner_info_result => {
                    land_owner_info_result['wAddress'] = data['land_info']['currentOwner'];
                    dispatch(success(land_owner_info_result));
                    history.push('/details');
                },
                error => {
                    if(typeof error === 'string' || error instanceof String){
                        // console.log("error: ", error);
                        dispatch(failure(error));
                        dispatch(alertActions.error(error));
                    }else{
                        dispatch(failure(error.name + error.message));
                        dispatch(alertActions.error(error.message));
                    }
                    
                }
            )
    }

    function save(data) { return { type: landConstants.LAND_SAVE_SUCCESS, data } }
    function success(land_owner_result) { return { type: landConstants.LAND_OWNER_SUCCESS, land_owner_result } }
    function failure(error) { return { type: landConstants.LAND_OWNER_FAILURE, error } }
}

