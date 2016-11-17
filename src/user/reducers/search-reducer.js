import _ from 'lodash';
import { search } from 'actions';

import { handleActions } from 'redux-actions';

const initialState = {
  data: { },
  status: 'waiting',
};

export default handleActions({
  [search.PORT_SEARCH]: (state, action) => _.assign({}, state, action.payload),
}, initialState);
