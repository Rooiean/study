import _ from 'lodash';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import { search } from 'actions';

import { Transport } from 'components';
import { Button, Input } from 'react-bootstrap';

export class Transports extends Component {
  render() {

    const { allPorts, transports } = this.props.search;

    return (
      <div className="tables">
        <h2 className="fl">Transports</h2>
        <div className="table-actions fr">
          <Input type="text" placeholder="Search..." /><Button>검색</Button>
          <span>|</span>
          <Button className="add" bsStyle="primary">새로운 Transport 추가하기</Button>
        </div>
        <hr className="cb" />
        <div className="th">
          <div className="sm-td">Id</div>
          <div>Type</div>
          <div className="lg-td">Name</div>
          <div>Cost($)</div>
          <div className="sm-td">Distance</div>
          <div className="md-td">Cycle</div>
          <div className="lg-td">sPort</div>
          <div className="lg-td">dPort</div>
          <div className="sm-td">Time</div>
          <div>Status</div>
          <div className="btns">Actions</div>
        </div>
        {
          _.map(transports, (transport, index) => {
            return <Transport key={index} transport={transport} allPorts={allPorts} />
          })
        }

      </div>
    );
  }
}

export default connect(state=>state)(Transports);
