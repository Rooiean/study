import _ from 'lodash';
import React, { Component } from 'react';
import { Label, Table, ProgressBar } from 'react-bootstrap';
import TransportDetail from './transport-detail';
import store from 'store';

export default class RouteDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portAndTransInfo: [],
      ulWidth: {},
    }

    this.routeInformation = this.routeInformation.bind(this);
    this.costProgress = this.costProgress.bind(this);
  }

  componentDidMount() {
    this.routeInformation();
  }

  componentDidUpdate(prevProps) {
    if(!_.isEqual(prevProps.route, this.props.route)) {
      this.routeInformation();
      console.log('update');
    }
  }

  routeInformation() {
    const { route, allPorts } = this.props;
    let portAndTransArray = [];

    const ulStyle = {
      width: (60 * (_.nth(route, 1)/3)) + ((route.length) * 60) +'px'
    };

    for (let i=2; i<route.length; i++){
      if (i%2==0) {
        const portInfo = _.find(allPorts, {'id': route[i] });
        portAndTransArray.push(portInfo);
      } else {
        portAndTransArray.push(route[i]);
      }
    }

    this.setState({
      portAndTransInfo : portAndTransArray,
      ulWidth: ulStyle,
    });
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
    const { portAndTransInfo, ulWidth } = this.state;

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
        <ul className="port-list" style={ ulWidth }>
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
