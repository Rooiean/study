import _ from 'lodash';
import React, { Component } from 'react';
import RouteDetail from './route-detail';
import { Label, Table } from 'react-bootstrap';

export default class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.findPortInfo = this.findPortInfo.bind(this);
  }

  render() {
    const { transports, allPorts, routes } = this.props.search;

    return (
      <div className="result-container">
        <h4 className="count">검색결과 : <em>{ routes.resultCount }</em>건</h4>
        {
          (() => {
            if (_.isEqual(routes.resultCount, 0)) {
                return <p className="no-result">검색 결과가 없습니다.</p>;
            }
            return (
              <div className="search-result">

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
                <ul className="list">
                {
                  _.map(routes.routes, (route, index) => (
                    <RouteDetail key={index} route={route} allPorts={allPorts} transports={transports} />
                  ))
                }
                </ul>
              </div>
            );
          })()
        }

      </div>
    );
  }
}
