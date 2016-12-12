import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import { App, Home, AirSchedule, TerminalSchedule, OceanSchedule,
  AdminApp, SearchRoutes, Ports, Transports, Scrapper } from './containers';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="air" component={AirSchedule} />
      <Route path="ocean" component={OceanSchedule} />
      <Route path="terminal" component={TerminalSchedule} />
    </Route>
    <Route path="/admin" component={AdminApp}>
      <IndexRoute component={SearchRoutes} />
      <Route path="search" component={SearchRoutes} />
      <Route path="ports" component={Ports} />
      <Route path="transports" component={Transports} />
      <Route path="scrapper" component={Scrapper} />
    </Route>
  </Router>
);

export default routes;
