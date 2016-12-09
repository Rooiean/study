import _ from 'lodash';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { Col } from 'react-bootstrap';
import CostEditor from '../components/cost-editor';

import { costs } from 'actions';
import store from 'store';

export class Cost extends Component {
  componentDidMount() {
    store.dispatch(costs.getCosts());
  }

  render() {
    const { data } = store.getState().costs;

    return (
      <div className="page-wrapper">
        <Col md={8} lg={4} className="cost-box">
          { !_.isEmpty(data) && <CostEditor cost={data} /> }
        </Col>
      </div>
    );
  }
}

export default connect(state=>state)(Cost);
