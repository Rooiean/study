import _ from 'lodash';
import { createAction } from 'redux-actions';

const prefix = 'http://138.91.25.49:4567';

export const PUT_TRANSPORT = '[API] PUT_TRANSPORT';

export const __putTransport__ = createAction(PUT_TRANSPORT);

export const putTransport = (id, name, sourcePort, destinationPort, type, scheduleList, cycle, cost, requiredTime, status) => (dispatch) =>
  dispatch(__putTransport__({
    path: prefix + `/transports/${id}?name=${name}&sourcePort=${sourcePort}&destinationPort=${destinationPort}&type=${type}&scheduleList=${scheduleList}&cycle=${cycle}&cost=${cost}&requiredTime=${requiredTime}&status=${status}`,
    method: 'put',
    dist: 'trans', status: 'transPutStatus',
  }))
