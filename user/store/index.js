import _ from 'lodash';
import thunk from 'redux-thunk';
import { api } from 'middleware';
import { contains } from 'underscore.string';
import createLogger from 'redux-logger';
import { reduxReactRouter } from 'redux-router';
import { createHistory, createHashHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';

import routes from '../routes';
import reducers from 'reducers';

export function canPushState() {
  return window.history.pushState && !contains(window.navigator.userAgent, 'CriOS');
}

const isProduction = _.isEqual(process.env.NODE_ENV, 'production');
const middlewares = [thunk, api];

if (!isProduction) {
  middlewares.push(createLogger());
}

export default compose(
  applyMiddleware(...middlewares),
  reduxReactRouter({
    routes,
    createHistory: canPushState() ? createHistory : createHashHistory,
  })
)(createStore)(reducers);
