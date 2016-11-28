import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { search } from 'actions';
import { Port } from 'components/port';
import { Grid, Button, Input } from 'react-bootstrap';

export class Ports extends Component {

  render() {
    const { allPorts } = this.props.search;

    return (
      <Grid className="page-wrapper">
        <div className="tables">
          <h2 className="fl">Ports</h2>
          <div className="table-actions fr">
          </div>
          <hr className="cb" />
          <div className="th">
            <div className="port-td">Id</div>
            <div className="port-td">Type</div>
            <div className="port-td">Name</div>
            <div className="port-td">Country</div>
            <div className="port-td">Location</div>
            <div className="port-td">LatLng</div>
            <div className="port-td">Actions</div>
          </div>
          {
            _.map(allPorts, (port, index) => {
              return <Port key={index} port={port} />
            })
          }
        </div>
      </Grid>
    );
  }
}

export default connect(state=>state)(Ports);
