import _ from 'lodash';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMap: false,
    };

    this.showDetailMap = this.showDetailMap.bind(this);
  }

  showDetailMap() {
    const { showMap } = this.state;

    if(_.isEqual(showMap, false)) {
      this.setState({showMap: true});
    } else {
      this.setState({showMap: false});
    }
  }


  render() {
    const { schedule, firstRoute } = this.props;
    const { showMap } = this.state;
    console.log(firstRoute);
    return(
      <div>
        <div className="tbody air">
          <div className="air-td">{schedule.operatorName}</div>
          <div className="air-td">
            <div>{ schedule.srcCountryCode }</div>
            <div>{ schedule.depTime }</div>
          </div>
          <div className="air-td">
            <div>{ schedule.dstCountryCode }</div>
            <div>{ schedule.arrTime }</div>
          </div>
          <div className="air-td">
            { schedule.serviceName }
          </div>
          <div className="air-td">
            { schedule.duration } 일
          </div>
        </div>
      </div>
    );
  }
}
