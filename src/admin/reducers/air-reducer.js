import _ from 'lodash';
import { air } from 'actions';

import { handleActions } from 'redux-actions';

const initialState = {
  airport: [],
  airportStatus: 'waiting',
  schedules: [],
  scheduleStatus: 'waiting',
};

export default handleActions({
  [air.ALL_AIRPORTS]: (state, action) => _.assign({}, state, action.payload),
  [air.SCHEDULE_SEARCH]: (state, action) => _.assign({}, state, action.payload),
}, initialState);
