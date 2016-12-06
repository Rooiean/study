import _ from 'lodash';
import { costs } from 'actions';

import { handleActions } from 'redux-actions';

const initialState = {
  data: {},
  costs: {},
  costsPutStatus: 'waiting',
  costsStatus: 'waiting',
};

export default handleActions({
  [costs.GET_COSTS]: (state, action) => _.assign({}, state, action.payload),
  [costs.PUT_COSTS]: (state, action) => _.assign({}, state, action.payload),
}, initialState);
