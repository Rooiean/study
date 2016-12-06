import _ from 'lodash';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { Col } from 'react-bootstrap';
import CostEditor from '../components/cost-editor';

export class Cost extends Component {
  render() {
    const { data } = this.props.costs;

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
