import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App, Home, Ports, Transports, Logs } from './containers';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="ports" component={Ports} />
    <Route path="transports" component={Transports} />
    <Route path="logs" component={Logs} />
  </Route>
);

export default routes;
