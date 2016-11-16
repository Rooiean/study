import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import { App, Home, Logs } from './containers';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="logs" component={Logs} />
    </Route>
  </Router>
);

export default routes;
