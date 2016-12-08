import _ from 'lodash';
import React, { Component } from 'react';
import { Label, Table, ProgressBar } from 'react-bootstrap';

export default class RouteDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portAndTransInfo: [],
    }

    this.routeInformation = this.routeInformation.bind(this);
    this.costProgress = this.costProgress.bind(this);
    this.findPortInfo = this.findPortInfo.bind(this);
  }

  componentDidMount() {
    this.routeInformation();
  }

  routeInformation() {
    const { route, allPorts, transports } = this.props;
    const reRoute = _.concat(route);
    const minuszero = _.pullAt(reRoute, [0, 1]);
    let portAndTransArray = [];

    for (let i=0; i<reRoute.length; i++){
      if (i%2==0) {
        const portInfo = _.find(allPorts, {'id': reRoute[i] });
        portAndTransArray.push(portInfo);
      } else {
        const transInfo = _.find(transports, {'id': reRoute[i] });
        portAndTransArray.push(transInfo);
      }
    }

    this.setState({ portAndTransInfo : portAndTransArray });
  }

  costProgress(cost) {
    const now = cost/3500000;
    let progStyle;
    if(now>50) {
      progStyle = 'danger';
    }
    return <ProgressBar bsStyle={progStyle} now={now} />
  }

  findPortInfo(queryText) {
    const { allPorts } = this.props.search;
    const portInfo = _.find(allPorts, { 'id': queryText });
    return <span>{ portInfo.name }({portInfo.locationCode}) / { portInfo.type }</span>;
  }


  render() {
    const { route } = this.props;
    const { portAndTransInfo } = this.state;
    console.log(portAndTransInfo);

    return (
      <div className="route-detail">
        <div className="route-contents">
          <div>가격 : { this.costProgress(_.nth(route, 0)) }</div>
          <div>시간 : { _.nth(route, 1) }일</div>
          <div>환승횟수: { (route.length - 5) / 2 }번</div>
          <ul className="port-list">
          {
            _.map(portAndTransInfo, (pinfo, index) => {
              if(index%2==0) {
                return(
                  <li key={ index } className={ pinfo.type }>
                    <div>{ pinfo.name }, { pinfo.countryCode }</div>
                    <div>{ pinfo.type }</div>
                  </li>
                );
              } else {
                const timeWidth = { width: (10 * pinfo.requiredTime/5) + '%' };
                return(
                  <li key={ index } className={ pinfo.type } style={timeWidth}>
                    <div>{ pinfo.type }</div>
                    <div>{ pinfo.requiredTime }</div>
                  </li>
                );
              }
            })
          }
          </ul>
        </div>
      </div>
    );
  }
}
