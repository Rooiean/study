import _ from 'lodash';
import { createAction } from 'redux-actions';

const prefix = 'http://40.74.122.172:4567';

export const GET_COSTS = '[API] GET_COSTS';
export const PUT_COSTS = '[API] PUT_COSTS';

/* =========================================================
 * Private Actions
 * ========================================================= */

export const __getCosts__ = createAction(GET_COSTS);
export const __putCosts__ = createAction(PUT_COSTS);

/* =========================================================
 * Actions
 * ========================================================= */

 export const getCosts = () => dispatch =>
   dispatch(__getCosts__({
     method: 'get',
     path: prefix + '/costs',
     status: 'costsStatus',
   }));

export const putCosts = (air, sea, road, rail) => dispatch =>
  dispatch(__putCosts__({
    method: 'put',
    path: prefix + `/costs/all?air=${air}&sea=${sea}&road=${road}&rail=${rail}`,
    dist:'costs', status: 'costsPutStatus',
  }));
