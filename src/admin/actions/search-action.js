import _ from 'lodash';
import { createAction } from 'redux-actions';

const prefix = 'http://138.91.25.49:4567';

export const ALL_PORTS = '[API] ALL_PORTS';
export const ALL_TRANSPORTS = '[API] ALL_TRANSPORTS';
export const PORT_SEARCH = '[API] PORT_SEARCH';
export const ROUTE_SEARCH = '[API] ROUTE_SEARCH';
export const DETECT_LOGS = '[API] DETECT_LOGS';

/* =========================================================
 * Private Actions
 * ========================================================= */

export const __allPorts__ = createAction(ALL_PORTS);
export const __allTransports__ = createAction(ALL_TRANSPORTS);
export const __portSearch__ = createAction(PORT_SEARCH);
export const __routeSearch__ = createAction(ROUTE_SEARCH);
export const __detectLogs__ = createAction(DETECT_LOGS);

/* =========================================================
 * Actions
 * ========================================================= */

 export const allPorts = () => dispatch =>
   dispatch(__allPorts__({
     method: 'get',
     path: prefix + '/ports?type=ALL&countrycode=ALL',
     dist: 'allPorts', status: 'allPortsStatus',
   }));

 export const allTransports = () => dispatch =>
   dispatch(__allTransports__({
     method: 'get',
     path: prefix + '/transports?type=ALL',
     dist: 'transports', status: 'transportsStatus',
   }));


export const portSearch = (type, country) => dispatch =>
  dispatch(__portSearch__({
    method: 'get',
    path: prefix + `/ports?type=${type}&countrycode=${country}`,
  }));


export const routeSearch = (sport, dport, depth, cost, term) => dispatch =>
  dispatch(__routeSearch__({
    method: 'get',
    path: prefix + `/searchroutes/routes?sport=${sport}&dport=${dport}&limitdepth=${depth}&costlimit=${cost}&termlimit=${term}`,
    dist: 'routes', status: 'routesStatus',
  }))

export const detectLogs = () => dispatch =>
  dispatch(__detectLogs__({
    method:'get',
    path: prefix + '/searchroutes/detectlog?sport=AIR4&dport=AIR10&resultcount=10',
    dist: 'logs', status: 'logStatus',
  }))
