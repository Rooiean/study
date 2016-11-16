import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import { App, Home, Ports, Transports, Logs } from './containers';

const routes = (
  <Router history={browserHistory}>
    <Route path="/admin" component={App}>
      <IndexRoute component={Home} />
      <Route path="ports" component={Ports} />
      <Route path="transports" component={Transports} />
      <Route path="logs" component={Logs} />
    </Route>
  </Router>
);

export default routes;
