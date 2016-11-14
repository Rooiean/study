import _ from 'lodash';
import assign from 'deep-assign';
import { createAction } from 'redux-actions';

const camelCase = (...args) => {
  let output = '';
  _.forEach(args, arg => (output += ` ${arg || ''}`));

  return _.camelCase(output);
};

export const createRestful = (routePath, namespace = 'data') => {
  const hash = _.toUpper(_.random(1, true).toString(36).substring(5));

  /* eslint-disable no-shadow */
  const replacePath = (routePath, params, id) => {
  /* eslint-enable no-shadow */
    let _routePath = routePath;
    const matches = routePath.match(/:[a-zA-Z]+_?[a-zA-Z]*/g);

    _.forEach(matches, match => {
      const key = match.substring(1);
      const value = params[key];

      if (!_.isNumber(value) && !_.isString(value)) { return; }

      _routePath = _routePath.replace(match, value);
      /* eslint-disable no-param-reassign */
      delete params[key];
      /* eslint-enable no-param-reassign */
    });

    if (_.isNumber(id) || _.isString(id)) {
      return `${_routePath}/${id}`;
    }

    return _routePath;
  };

  const uNamespace = _.toUpper(namespace);
  const GET = `[API] ${uNamespace}_GET_${hash}`;
  const FETCH = `[API] ${uNamespace}_FETCH_${hash}`;
  const POST = `[API] ${uNamespace}_POST_${hash}`;
  const UPDATE = `[API] ${uNamespace}_UPDATE_${hash}`;
  const DELETE = `[API] ${uNamespace}_DELETE_${hash}`;

  const __get__ = createAction(GET);
  const __fetch__ = createAction(FETCH);
  const __post__ = createAction(POST);
  const __update__ = createAction(UPDATE);
  const __delete__ = createAction(DELETE);

  const get = (id, params = {}) => dispatch =>
    dispatch(__get__({
      method: 'get', path: replacePath(routePath, params, id), params,
      dist: camelCase('get', namespace), status: camelCase('get', namespace, 'status'),
    }));

  const fetch = (params = {}, clear = true) => dispatch =>
    dispatch(__fetch__({
      method: 'get', path: replacePath(routePath, params), clear, params,
      dist: camelCase('fetch', namespace), status: camelCase('fetch', namespace, 'status'),
    }));

  const post = (params = {}, files) => dispatch =>
    dispatch(__post__({
      method: 'post', path: replacePath(routePath, params), params, files,
      dist: camelCase('post', namespace), status: camelCase('post', namespace, 'status'),
    }));

  const update = (id, params = {}, files) => dispatch =>
    dispatch(__update__({
      method: 'put', path: replacePath(routePath, params, id), params, files,
      dist: camelCase('update', namespace), status: camelCase('update', namespace, 'status'),
    }));

  const del = (id, params = {}) => dispatch => {
    const path = _.isObject(id) ? replacePath(routePath, id) : replacePath(routePath, params, id);

    return dispatch(__delete__({
      method: 'delete', path, params, dist: camelCase('delete', namespace),
      status: camelCase('delete', namespace, 'status'),
    }));
  };

  return {
    routePath, namespace,
    GET, FETCH, POST, UPDATE, DELETE,
    __get__, __fetch__, __post__, __update__, __delete__,
    get, fetch, post, update, del,
  };
};

export const createHandler = (...actions) => {
  if (actions.length > 1) {
    const _reducerMap = {};
    const _initialState = {};

    _.forEach(actions, action => {
      const handler = createHandler(action);

      assign(_reducerMap, handler.reducerMap);
      assign(_initialState, handler.initialState);
    });

    return { reducerMap: _reducerMap, initialState: _initialState };
  }

  const { GET, FETCH, POST, UPDATE, DELETE, routePath, namespace } = actions[0];

  const initialState = {
    routePath, namespace,
    [camelCase('get', namespace)]: {},
    [camelCase('fetch', namespace)]: {},
    [camelCase('post', namespace)]: {},
    [camelCase('update', namespace)]: {},
    [camelCase('delete', namespace)]: {},
    [camelCase('get', namespace, 'status')]: 'waiting',
    [camelCase('fetch', namespace, 'status')]: 'waiting',
    [camelCase('post', namespace, 'status')]: 'waiting',
    [camelCase('update', namespace, 'status')]: 'waiting',
    [camelCase('delete', namespace, 'status')]: 'waiting',
  };

  const reducerMap = {
    [GET]: (state, action) => _.assign({}, state, action.payload),
    [FETCH]: (state, action) => {
      if (action.payload.clear) {
        return _.assign({}, state, action.payload);
      }

      return _.assign({}, state, action.payload);
    },
    [POST]: (state, action) => _.assign({}, state, action.payload),
    [UPDATE]: (state, action) => _.assign({}, state, action.payload),
    [DELETE]: (state, action) => _.assign({}, state, action.payload),
  };

  return { reducerMap, initialState };
};
