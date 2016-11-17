import _ from 'lodash';
import { createAction } from 'redux-actions';

export const ALL_PORTS = '[API] ALL_PORTS';
export const PORT_SEARCH = '[API] PORT_SEARCH';

/* =========================================================
 * Private Actions
 * ========================================================= */

export const __allPorts__ = createAction(ALL_PORTS);
export const __portSearch__ = createAction(PORT_SEARCH);

/* =========================================================
 * Actions
 * ========================================================= */

 export const allPorts = () => dispatch =>
   dispatch(__allPorts__({
     method: 'get',
     path: 'http://192.168.1.23:4567/ports?type=ALL&countrycode=ALL',
   }));

export const portSearch = (type, country) => dispatch =>
  dispatch(__portSearch__({
    method: 'get',
    path: `http://192.168.1.23:4567/ports?type=${type}&countrycode=${country}`,
  }));
