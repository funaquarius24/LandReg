import { landConstants } from '../_constants';

const initialState = {};

export function landInfo(state = initialState, action) {
  switch (action.type) {
    case landConstants.LAND_SAVE_SUCCESS:
      return {
        landInfo: action.data
      };
    default:
      return state
  }
}