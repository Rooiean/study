import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

import store from 'store';
import routes from './routes';

ReactDOM.render(
  <Provider store={store}>
    <ReduxRouter>
      {routes}
    </ReduxRouter>
  </Provider>,
  document.getElementById('app')
);
