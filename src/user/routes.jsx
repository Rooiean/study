import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import { App, Home, Air } from './containers';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="air" component={Air} />
    </Route>
  </Router>
);

export default routes;
