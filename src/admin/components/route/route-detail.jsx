import _ from 'lodash';
import React, { Component } from 'react';
import { Label, Table, ProgressBar } from 'react-bootstrap';
import TransportDetail from './transport-detail';

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
    const { route, allPorts } = this.props;
    const reRoute = _.concat(route);
    let portAndTransArray = [];

    for (let i=2; i<reRoute.length; i++){
      if (i%2==0) {
        const portInfo = _.find(allPorts, {'id': reRoute[i] });
        portAndTransArray.push(portInfo);
      } else {
        portAndTransArray.push(reRoute[i]);
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
    const { route, transports } = this.props;
    const { portAndTransInfo } = this.state;
    const ulStyle = {
      width: (60 * (_.nth(route, 1)/3)) + ((route.length - 2) * 60) +'px'
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
                  <div className="pinfo-name">{ pinfo.name }, { pinfo.countryCode }</div>
                </li>
              );
            } else {
              return <TransportDetail pinfo={pinfo} key={index} transports={transports} />;
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
