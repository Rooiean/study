import _ from 'lodash';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import { search } from 'actions';

import { Port } from 'components/port';
import { Button, Input } from 'react-bootstrap';

export class Ports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddModal: false,
    }

    this.handleShowAddModal = this.handleShowAddModal.bind(this);
    this.handleHideAddModal = this.handleHideAddModal.bind(this);
  }

  handleShowAddModal() {
    this.setState({showAddModal:true});
  }

  handleHideAddModal() {
    this.setState({showAddModal:false});
  }

  render() {
    const { allPorts } = this.props.search;

    return (
      <div className="tables">
        <h2 className="fl">Ports</h2>
        <div className="table-actions fr">
          <Button className="add" bsStyle="primary" onClick={this.handleShowAddModal}>새로운 Port 추가하기</Button>
        </div>
        <hr className="cb" />
        <div className="th">
          <div className="sm-td">Id</div>
          <div>Type</div>
          <div className="lg-td">Name</div>
          <div>Country</div>
          <div className="sm-td">Location</div>
          <div className="lg-td">LatLng</div>
          <div className="lg-td">Arrival</div>
          <div className="sm-td">Departure</div>
          <div className="btns">Actions</div>
        </div>
        {
          _.map(allPorts, (ports, index) => {
            return <Port key={index} port={ports} />
          })
        }
      </div>
    );
  }
}

export default connect(state=>state)(Ports);
