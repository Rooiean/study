import _ from 'lodash';
import { search } from 'actions';

import { handleActions } from 'redux-actions';

const initialState = {
  allPorts: {},
  allPortsSatus: 'waiting',
  data: {},
  status: 'waiting',
  routes: [],
  routeStatus: 'waiting',
  transports: {},
  transportsStatus: 'waiting',
};

export default handleActions({
  [search.ALL_PORTS]: (state, action) => _.assign({}, state, action.payload),
  [search.ALL_TRANSPORTS]: (state, action) => _.assign({}, state, action.payload),
  [search.PORT_SEARCH]: (state, action) => _.assign({}, state, action.payload),
  [search.ROUTE_SEARCH]: (state, action) => _.assign({}, state, action.payload),
}, initialState);
