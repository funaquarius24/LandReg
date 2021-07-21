import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { search } from './search.reducer';
import { landOwner } from './landOwner.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  search,
  landOwner
});

export default rootReducer;