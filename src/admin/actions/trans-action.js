import _ from 'lodash';
import { createAction } from 'redux-actions';

const prefix = 'http://138.91.25.49:4567';

export const PUT_TRANSPORT = '[API] PUT_TRANSPORT';

export const __putTransport__ = createAction(PUT_TRANSPORT);

export const putTransport = (id, params) => dispatch =>
  dispatch(__putTransport__({
    method:'put',
    path: prefix + `/transports/${id}`, params,
    dist: 'trans', status: 'transPutStatus',
  }))
