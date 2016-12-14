import _ from 'lodash';
import React, { Component } from 'react';
import RouteDetail from './route-detail';
import { Input, ProgressBar } from 'react-bootstrap';
import store from 'store';

export default class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fistRoute: [],
      order: 'cost',
    }
    this.routeOrigAndDest = this.routeOrigAndDest.bind(this);
    this.findPortInfo = this.findPortInfo.bind(this);
    this.handleChangeOrder = this.handleChangeOrder.bind(this);
  }

  componentDidMount() {
    this.routeOrigAndDest();
  }

  componentDidUpdate(prevProps) {
    if(_.isEqual(prevProps.routes, this.props.routes)) {
      return;
    }
    this.routeOrigAndDest();
  }

  routeOrigAndDest() {
    const { routes } = this.props.search;
    const { firstRoute } = this.state;
    let routeFirst = [];
    if(!_.isEmpty(routes.routes)) {
      routeFirst = _.nth(routes.routes, 0);
      this.setState({firstRoute:routeFirst});
    }
  }

  findPortInfo(queryText) {
    const { allPorts } = this.props.search;
    const portInfo = _.find(allPorts, { 'id': queryText });
    return <div className={ portInfo.type }>{ portInfo.name }({portInfo.locationCode}) / { portInfo.type }</div>;
  }

  handleChangeOrder() {
    const orderType = this.refs.orderBy.getValue();
    console.log(orderType);

    this.setState({order: orderType});
  }

  render() {
    const { transports, allPorts, routes, routesStatus } = this.props.search;
    const { firstRoute, order } = this.state;

    return (
      <div className="result-container">
        <div className="order-by">
          <label>정렬 : </label>
          <Input type="select" ref="orderBy" defaultValue="cost" onChange={this.handleChangeOrder}>
            <option value="cost">가격순</option>
            <option value="time">시간순</option>
            <option value="takeoff">출발날짜</option>
          </Input>
        </div>
        <h4 className="count">검색결과 : <em>{ routes.resultCount }</em>건</h4>
        <hr className="cb" />
        {
          (() => {
            if (_.isEqual(routes.resultCount, 0)) {
                return <p className="no-result">검색 결과가 없습니다.</p>;
            }
            return (
              <div className="search-result">
                {
                  (() => {
                    if(!_.isEmpty(firstRoute)) {
                        return(
                          <div className="start-end">
                            <div className="start">{ this.findPortInfo(_.nth(firstRoute, 2)) }</div>
                            <div className="end">{ this.findPortInfo(_.last(firstRoute)) }</div>
                          </div>
                        );
                    }
                  })()
                }
                <div className="route-box">
                {
                  (() => {
                    if(_.isEqual(routesStatus, 'request')) {
                      return (
                        <div className="loading">
                          <ProgressBar active now={100} />
                        </div>
                      );
                    } else if(_.isEqual(routesStatus, 'success')) {

                      let routeList = _.sortBy(routes.routes, route => parseFloat(_.nth(route, 0)));

                      if(_.isEqual(order, 'time')) {
                        routeList = _.sortBy(routes.routes, route => parseFloat(_.nth(route, 1)));
                      }

                      if (_.isEqual(order, 'takeoff')) {
                        routeList = _.sortBy(routes.routes, route => _.join(_.split(_.last(_.split(_.nth(route, 3), ':')),'-'), ''));
                      }

                      return (
                        _.map(routeList, (route, index) => {
                          return <RouteDetail key={index} route={route} allPorts={allPorts} transports={transports} />;
                        })
                      );
                    } else {
                      return null;
                    }
                  })()
                }
                </div>
              </div>
            );
          })()
        }

      </div>
    );
  }
}
