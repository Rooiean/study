import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Logs extends Component {
  render() {
    return (
      <div>
        Logs
      </div>
    );
  }
}

export default connect(state=>state)(Logs);
