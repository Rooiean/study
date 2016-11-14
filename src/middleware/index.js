import _ from 'lodash';
import { noCache } from 'contrib';
import superagent from 'superagent';
import superagentAsPromised from 'superagent-as-promised';
import { contains } from 'underscore.string';

export const api = store => next => action => {
  const { path } = _.get(action, 'payload', {});
  const actionWith = props => {
    const _action = _.cloneDeep(action);
    _action.payload = _.assign({}, action.payload, props);
    delete _action.payload.path;

    return _action;
  };

  // stop to current dispatch loop when removed path.
  if (!contains(action.type, 'API') || !_.has(action.payload, 'path')) {
    return next(action);
  }

  const dist = _.get(action.payload, 'dist', 'data');
  const files = _.get(action.payload, 'files');
  const source = _.get(action.payload, 'source');
  const status = _.get(action.payload, 'status', 'status');
  const method = _.toLower(_.get(action.payload, 'method', 'get'));
  const params = _.get(action.payload, 'params', {});
  const headers = _.get(action.payload, 'headers', {});

  const fullPath = path;

  /* eslint-disable no-param-reassign */
  delete action.payload.dist;
  delete action.payload.files;
  delete action.payload.source;
  delete action.payload.status;
  delete action.payload.params;
  delete action.payload.method;
  delete action.payload.headers;
  /* eslint-enable no-param-reassign */

  next(actionWith({ [status]: 'request' }));

  superagentAsPromised(superagent);
  if (!_.isEmpty(files)) {
    let req = superagent[method](path);

    if (_.isArray(files)) {
      _.forEach(files, file => (req = req.attach('files[]', file, file.name)));
    }

    if (_.isPlainObject(files)) {
      _.forEach(files, (file, key) => (req = req.attach(key, file, file.name)));
    }

    _.forEach(params, (value, key) => (req = req.field(key, value)));
    _.forEach(headers, (value, key) => (req = req.set(key, value)));

    return req.withCredentials().use(noCache)
    .then(response => {
      const payload = { [status]: 'success' };
      const _response = _.isEmpty(source) ? response.body : _.get(response.body, source);

      _.set(payload, dist, _response);

      store.dispatch(actionWith(payload));

      return _response;
    })
    .catch(error => {
      store.dispatch(actionWith({ [status]: 'failure', error }));

      return error;
    });
  }

  const func = _.isEqual(method, 'delete') ? 'del' : method;
  let req = superagent[func](fullPath);

  if (_.isEqual(method, 'get')) {
    req = req.query(params);
  } else {
    req = req.send(params);
  }

  return req.withCredentials().use(noCache)
  .then(response => {
    const payload = { [status]: 'success' };
    const _response = _.isEmpty(source) ? response.body : _.get(response.body, source);

    _.set(payload, dist, _response);

    store.dispatch(actionWith(payload));

    return _response;
  })
  .catch(error => {
    store.dispatch(actionWith({ [status]: 'failure', error }));

    return error;
  });
};
