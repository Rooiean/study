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
  }

  componentDidMount() {
    this.routeInformation();
  }

  componentWillReceiveProps(nextProps) {
    if(_.isEqual(this.props.route, nextProps.route)) {
      return;
    }
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
        let transId = _.head(_.split(reRoute[i], ':'));
        const transInfo = _.find(transports, {'id': transId });
        portAndTransArray.push(transInfo);
      }
    }

    this.setState({ portAndTransInfo : portAndTransArray });
  }

  costProgress(cost) {
    const now = cost/100;
    let progStyle;
    if(now>50) {
      progStyle = 'danger';
    }
    return <ProgressBar bsStyle={progStyle} now={now} />
  }


  render() {
    const { route } = this.props;
    const { portAndTransInfo } = this.state;
    const ulStyle = {
      width: (60 * _.nth(route, 1)/3) + (route.length * 60) - 200 +'px'
    };
    return (
      <div className="route-detail">
        <Table>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
        <div className="for-scroll">
        <ul className="port-list" style={ulStyle}>
        {
          _.map(portAndTransInfo, (pinfo, index) => {
            if(index%2==0) {
              return(
                <li key={ index } className={ pinfo.type }>
                  <div>{ pinfo.name }, { pinfo.countryCode }</div>
                </li>
              );
            } else {
              if(_.isEqual(pinfo.type, 'VESSEL')) {
                const timeWidth = { width: (60 * pinfo.requiredTime/3) + 'px' };
                return (
                  <li key={ index } className={ pinfo.type } style={timeWidth}>
                    <div>{ pinfo.type }</div>
                    <div>{ pinfo.requiredTime } 일</div>
                  </li>
                );
              } else {
                const timeWidth = { width: '60px' };
                return (
                  <li key={ index } className={ pinfo.type } style={timeWidth}>
                    <div>{ pinfo.type }</div>
                    <div>{ pinfo.requiredTime } 시간</div>
                  </li>
                );
              }
            }
          })
        }
        </ul>
      </div>
        <div className="route-info">
          <div>가격 : { this.costProgress(_.nth(route, 0)) }</div>
          <div>시간 : { _.nth(route, 1) }일</div>
          <div>환승횟수: { (route.length - 5) / 2 }번</div>
        </div>
      </div>
    );
  }
}
