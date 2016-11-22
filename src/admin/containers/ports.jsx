import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { search } from 'actions';

export class Ports extends Component {
  componentDidMount() {
    this.props.dispatch(search.allPorts());
  }
  render() {
    const { allPorts } = this.props.search;
    return (
      <div>
        {
          _.map(allPorts, (port, index) => {
            return <div key={index}>{port.name}</div>;
          })
        }
      </div>
    );
  }
}

export default connect(state => state)(Ports);
