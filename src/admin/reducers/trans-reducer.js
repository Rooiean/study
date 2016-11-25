import _ from 'lodash';
import { trans } from 'actions';

import { handleActions } from 'redux-actions';

const initialState = {
  trans: {},
  transPutStatus: 'waiting',
  transPostStatus: 'waiting',
  transDelStatus: 'waiting',
};

export default handleActions({
  [trans.PUT_TRANSPORT]: (state, action) => _.assign({}, state, action.payload),
  [trans.POST_TRANSPORT]: (state, action) => _.assign({}, state, action.payload),
  [trans.DEL_TRANSPORT]: (state, action) => _.assign({}, state, action.payload),
}, initialState);
