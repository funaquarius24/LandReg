import { landConstants } from '../_constants';

const initialState = {};

export function landCert(state = initialState, action) {
  switch (action.type) {
    case landConstants.LAND_CERT_SUCCESS:
      return {
        items: action.land_cert_info_result
      };
    case landConstants.LAND_CERT_FAILURE:
      return {
        error: action.error
      }
    default:
      return state
  }
}