import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import search from './search-reducer';
import trans from './trans-reducer';

export default combineReducers({
  router, search, trans,
});
