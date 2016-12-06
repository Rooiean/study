import { connect } from 'react-redux';
import React, { Component } from 'react';

export class Scrapper extends Component {
  render() {
    return (
      <div className="iframe-container">
        <iframe src="http://inner.tradlinx.com/managescraper"></iframe>
      </div>
    );
  }
}

export default connect(state=>state)(Scrapper);
