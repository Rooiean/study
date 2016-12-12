import { connect } from 'react-redux';
import React, { Component } from 'react';

export class OceanSchedule extends Component {
  render() {
    return (
      <div className="iframe-container">
        <iframe src="http://www.tradlinx.com/noheader/#/search/fcl"></iframe>
      </div>
    );
  }
}

export default connect(state=>state)(OceanSchedule);
