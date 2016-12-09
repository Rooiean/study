import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import search from './search-reducer';

export default combineReducers({
  router, search,
});
