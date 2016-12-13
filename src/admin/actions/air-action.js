import _ from 'lodash';
import { createAction } from 'redux-actions';

const prefix = 'http://138.91.25.49:4567';

export const ALL_AIRPORTS = '[API] ALL_AIRPORTS';
export const SCHEDULE_SEARCH = '[API] SCHEDULE_SEARCH';

/* =========================================================
 * Private Actions
 * ========================================================= */

export const __allAirPorts__ = createAction(ALL_AIRPORTS);
export const __scheduleSearch__ = createAction(SCHEDULE_SEARCH);

/* =========================================================
 * Actions
 * ========================================================= */

 export const allAirPorts = () => dispatch =>
   dispatch(__allAirPorts__({
     method: 'get',
     path: prefix + '/schedules/ports',
     dist: 'airport', status: 'airportStatus',
   }));

export const scheduleSearch = (from_date, to_date, s_port, d_port) => dispatch =>{
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!
  let yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  };

  if(mm<10) {
      mm='0'+mm
  };

  today = yyyy+'-'+mm+'-'+dd;

  if (_.isEmpty(from_date)) {
    from_date = today;
  };


  let x = 1;

  let oneMonthLater = new Date();
  oneMonthLater.setMonth(oneMonthLater.getMonth() + x);

  let bb = oneMonthLater.getDate();
  let nn = oneMonthLater.getMonth()+1; //January is 0!
  let xxxx = oneMonthLater.getFullYear();

  if(bb<10) {
      bb='0'+bb
  };

  if(nn<10) {
      nn='0'+nn
  };

  oneMonthLater = xxxx+'-'+nn+'-'+bb;

  if(_.isEmpty(to_date)) {
    to_date = oneMonthLater;
  };

  return dispatch(__scheduleSearch__({
    method: 'get',
    path: prefix + `/schedules?type=AIR&from_date=${from_date}&to_date=${to_date}&s_port=${s_port}&d_port=${d_port}`,
    dist: 'schedules', status: 'scheduleStatus',
  }));
}
