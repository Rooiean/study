import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { App, Home, Ports, Transports, Logs } from './containers';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="ports" component={Ports} />
      <Route path="transports" component={Transports}/>
      <Route path="logs" component={Logs}/>
    </Route>
  </Router>, document.getElementById('app')
);
