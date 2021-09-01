import { landConstants } from '../_constants';

export function landOwner(state = {}, action) {
  switch (action.type) {
    case landConstants.LAND_OWNER_REQUEST:
      return {
        loading: true
      };
    case landConstants.LAND_OWNER_SUCCESS:
      return {
        items: action.land_owner_result
      };
    case landConstants.LAND_OWNER_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}