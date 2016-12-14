import _ from 'lodash';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class Port extends Component {
  render() {
    const { port } = this.props;
    return (
      <div>
        <div className="tbody">
          <div className="port-td">{ port.id }</div>
          <div className="port-td">{ port.type }</div>
          <div className="port-td">{ port.name }</div>
          <div className="port-td">{ port.countryCode }</div>
          <div className="port-td">{ port.locationCode }</div>
          <div className="port-td">{ port.latitude }, { port.longitude }</div>
        </div>
      </div>
    );
  }
}
