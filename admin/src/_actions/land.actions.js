import { landConstants } from '../_constants';
import { landService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

import {useDispatch, useSelector} from "react-redux"; 

export const landActions = {
    land_id_selected,
    edit_details_submitted,
    apply_details_submitted
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

function edit_details_submitted(submitted_data) {
    const cert_data = {};

    console.log("submitted_data: ", submitted_data);

    
    
    cert_data.state =        submitted_data.landCompState.state;
    cert_data.district =     submitted_data.landCompState.district;
    cert_data.cadzone =      submitted_data.landCompState.cadzone;
    cert_data.plotNumber =   parseInt(submitted_data.landCompState.plotNumber);
    cert_data.cofo =         submitted_data.rocoCompState.cofo;
    cert_data.cofoDate =     parseInt(submitted_data.rocoCompState.cofoDate) ;
    cert_data.rofoHash =     submitted_data.rocoCompState.rofoHash;
    cert_data.rofoDate =     parseInt(submitted_data.rocoCompState.rofoDate);
    cert_data.stateOfAdmin = submitted_data.landCompState.state;
    cert_data.certNumber =   submitted_data.rocoCompState.certNumber;

    console.log("cofo: ", cert_data.cofo, " rofo: ", cert_data.rofoHash);
    if(!(cert_data.state && cert_data.district && 
        cert_data.cadzone && cert_data.plotNumber 
        && cert_data.cofo && cert_data.rofoHash)){
        return dispatch => {
            const compare_error = "Required fields are missing in ro/co"
            // console.log(compare_error);
            dispatch(failure(compare_error));
            dispatch(alertActions.error(compare_error));
        }
    }

    return dispatch => {
        landService.edit_details(cert_data)
            .then(
                edit_details_result => {
                    dispatch(alertActions.success("Land details successfully edited"));
                },
                error => {
                    dispatch(failure(error.name + error.message));
                    dispatch(alertActions.error(error.message));
                    console.log("error message: ", error.message);
                }
            )
    }
    function failure(error) { return { type: landConstants.LAND_CERT_FAILURE, error } }

}

function apply_details_submitted(submitted_data) {

    const owner_data = {}
    const land_data = {}
    const cert_data = {}

    owner_data.name =         submitted_data.ownerCompState.name;
    owner_data.gender =       submitted_data.ownerCompState.gender
    owner_data.dob =          parseInt(submitted_data.ownerCompState.dob);
    owner_data.ownerAddress = submitted_data.ownerCompState.ownerAddress;
    owner_data.phone1 =       submitted_data.ownerCompState.phone1;
    owner_data.phone2 =       submitted_data.ownerCompState.phone2;
    owner_data.NIN =          submitted_data.ownerCompState.NIN;
    owner_data.email =        submitted_data.ownerCompState.email;
    owner_data.password =     submitted_data.ownerCompState.password;
    owner_data.stateOfAdmin = submitted_data.landCompState.stateOfAdmin;

    land_data.state =         submitted_data.landCompState.state;
    land_data.district =      submitted_data.landCompState.district;
    land_data.cadzone =       submitted_data.landCompState.cadzone;
    land_data.plotNumber =    parseInt(submitted_data.landCompState.plotNumber);
    land_data.plotSize =      parseInt(submitted_data.landCompState.plotSize);
    land_data.email =         submitted_data.ownerCompState.email;

    cert_data.state =        submitted_data.landCompState.state;
    cert_data.district =     submitted_data.landCompState.district;
    cert_data.cadzone =      submitted_data.landCompState.cadzone;
    cert_data.plotNumber =   parseInt(submitted_data.landCompState.plotNumber);
    cert_data.cofo =         submitted_data.rocoCompState.cofo;
    cert_data.cofoDate =     parseInt(submitted_data.rocoCompState.cofoDate) ;
    cert_data.rofoHash =     submitted_data.rocoCompState.rofoHash;
    cert_data.rofoDate =     parseInt(submitted_data.rocoCompState.rofoDate);
    cert_data.stateOfAdmin = submitted_data.landCompState.state;
    cert_data.certNumber =   submitted_data.rocoCompState.certNumber;

    const data = {};

    var all_okay = true;
    if(!(cert_data.state && cert_data.district && 
        cert_data.cadzone && cert_data.plotNumber)){
        return dispatch => {
            const compare_error = "Required fields are missing in ro/co"
            // console.log(compare_error);
            dispatch(failure(compare_error));
            dispatch(alertActions.error(compare_error));
        }
    }
    
    for (const [key, value] of Object.entries(owner_data)) {
        if(!value){
            all_okay = false;
            break;
        }
      }

    if(!(submitted_data.landCompState.state && submitted_data.landCompState.district 
        && submitted_data.landCompState.cadzone && submitted_data.landCompState.plotNumber
        )){
        all_okay = false;
    }

    

    if(!all_okay){
        return dispatch => {
            const compare_error = "Required fields are missing in land documents"
            // console.log(compare_error);
            dispatch(failure(compare_error));
            dispatch(alertActions.error(compare_error));
        }
    }

    return dispatch => {
        landService.create_owner(owner_data)
            .then(
                create_owner_result => {
                    dispatch(alertActions.success("Owner data successfully created!"));
                },
                error => {
                    dispatch(failure(error.name + error.message));
                    dispatch(alertActions.error(error.message));
                }
            )
        landService.create_land(land_data)
            .then(
                create_land_result => {
                    dispatch(alertActions.success("Land data successfully created!"));
                },
                error => {
                    dispatch(failure(error.name + error.message));
                    dispatch(alertActions.error(error.message));
                }
            )
        landService.edit_details(data)
            .then(
                edit_details_result => {
                    dispatch(alertActions.success("Land details successfully edited"));
                },
                error => {
                    dispatch(failure(error.name + error.message));
                    dispatch(alertActions.error(error.message));
                }
            )
        
    }
    function failure(error) { return { type: landConstants.LAND_APPLY_DETAILS_FAILURE, error } }
    
}