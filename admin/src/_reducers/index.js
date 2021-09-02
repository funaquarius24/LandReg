import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { search } from './search.reducer';
import { landOwner } from './landOwner.reducer';
import { landData } from './landData.reducer';
import { landCert } from './landCert.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  search,
  landOwner,
  landData,
  landCert,
});

export default rootReducer;