import _ from 'lodash';
import React, { Component } from 'react';
import { search } from 'actions';
import { connect } from 'react-redux';
import { Transport } from 'components';

export class Transports extends Component {
  componentDidMount() {
    this.props.dispatch(search.allTransports());
  }
  render() {
    const { transports } = this.props.search;

    return (
      <div className="tables">
        <h2>Transports</h2>
        <div className="th">
          <div className="small-td">Id</div>
          <div>Type</div>
          <div className="name">Name</div>
          <div>Cost</div>
          <div>Cycle</div>
          <div className="small-td">sPort</div>
          <div className="small-td">dPort</div>
          <div className="r-time">rTime</div>
          <div>Status</div>
          <div className="btns">Actions</div>
        </div>
        {
          _.map(transports, (transport, index) => {
            return <Transport key={index} transport={transport} />
          })
        }

      </div>
    );
  }
}

export default connect(state=>state)(Transports);
