import _ from 'lodash';
import React, {Component} from 'react';
import { Col } from 'react-bootstrap';
import CostEditor from './cost-editor';

import { costs } from 'actions';
import store from 'store';

export default class Cost extends Component {
  componentDidMount() {
    store.dispatch(costs.getCosts());
  }

  render() {
    const { data } = store.getState().costs;

    return (
      <div className="cost-box">
        <h3>Transports Cost Editor</h3>
        { !_.isEmpty(data) && <CostEditor /> }
      </div>
    );
  }
}
