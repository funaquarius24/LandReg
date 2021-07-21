import { landOwnerConstants } from '../_constants';

export function landOwner(state = {}, action) {
  switch (action.type) {
    case landOwnerConstants.LAND_OWNER_REQUEST:
      return {
        loading: true
      };
    case landOwnerConstants.LAND_OWNER_SUCCESS:
      return {
        items: action.search_result
      };
    case landOwnerConstants.LAND_OWNER_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}