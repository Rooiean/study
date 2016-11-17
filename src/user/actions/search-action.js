import _ from 'lodash';
import { createAction } from 'redux-actions';

export const PORT_SEARCH = '[API] PORT_SEARCH';

/* =========================================================
 * Private Actions
 * ========================================================= */

export const __portSearch__ = createAction(PORT_SEARCH);

/* =========================================================
 * Actions
 * ========================================================= */

export const portSearch = (type, country) => dispatch =>
  dispatch(__portSearch__({
    method: 'get',
    path: 'http://192.168.1.23:4567/ports?type=ALL&countrycode=ALL',
  }));
