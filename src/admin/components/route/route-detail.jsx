import _ from 'lodash';
import React, { Component } from 'react';
import { Label, Table } from 'react-bootstrap';

export default class RouteDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portAndTransInfo: [],
    }

    this.routeInformation = this.routeInformation.bind(this);
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

  render() {
    const { route } = this.props;
    const { portAndTransInfo } = this.state;
    console.log(portAndTransInfo);

    return (
      <div className="route-detail">
        <div className="route-box">
          <Table>
            <tbody>
              <tr>
                <td>
                  <Label>0 days</Label>
                </td>
                <td>
                  <Label>5 days</Label>
                </td>
                <td>
                  <Label>10 days</Label>
                </td>
                <td>
                  <Label>15 days</Label>
                </td>
                <td>
                  <Label>20 days</Label>
                </td>
                <td>
                  <Label>25 days</Label>
                </td>
                <td>
                  <Label>30 days</Label>
                </td>
                <td>
                  <Label>35 days</Label>
                </td>
                <td>
                  <Label>40 days</Label>
                </td>
                <td>
                  <Label>45 days</Label>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="route-contents">
          <div>cost : { _.nth(route, 0) }</div>
          <div>time : { _.nth(route, 1) }</div>
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
