import { connect } from 'react-redux';
import React, { Component } from 'react';

export class AirSchedule extends Component {
  render() {
    return (
      <div className="iframe-container">
        <iframe src="http://www.tradlinx.com/small/#/search/fcl"></iframe>
      </div>
    );
  }
}

export default connect(state=>state)(Air);
