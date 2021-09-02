import { landConstants } from '../_constants';
import { landService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const landActions = {
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
    // console.log('land_id_selected: ', data);

    return dispatch => {
        const land_data_result = data;
        dispatch(save(land_data_result));
        // console.log('land curr owner: ',land_data_result);

        landService.get_land_owner_info(data['land_info']['currentOwner'])
            .then(
                land_owner_info_result => {
                    land_owner_info_result['wAddress'] = data['land_info']['currentOwner'];
                    dispatch(land_owner_success(land_owner_info_result));
                    // history.push('/details');
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

            landService.get_land_cert_info(data['land_id'])
            .then(
                land_cert_info_result => {
                    // land_owner_info_result['wAddress'] = data['land_info']['currentOwner'];
                    dispatch(land_cert_success(land_cert_info_result));
                    // history.push('/details');
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

            history.push('/details');

        
    }

    function save(land_data_result) { return { type: landConstants.LAND_SAVE_SUCCESS, land_data_result } }
    function land_owner_success(land_owner_result) { return { type: landConstants.LAND_OWNER_SUCCESS, land_owner_result } }
    function land_cert_success(land_cert_info_result) { return { type: landConstants.LAND_CERT_SUCCESS, land_cert_info_result } }
    function failure(error) { return { type: landConstants.LAND_OWNER_FAILURE, error } }
}

