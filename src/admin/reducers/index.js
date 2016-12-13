import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import search from './search-reducer';
import trans from './trans-reducer';
import costs from './cost-reducer';
import air from './air-reducer';

export default combineReducers({
  router, search, trans, costs, air,
});
