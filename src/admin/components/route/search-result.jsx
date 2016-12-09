import _ from 'lodash';
import React, { Component } from 'react';
import RouteDetail from './route-detail';
import { Label, Table } from 'react-bootstrap';
import store from 'store';

export default class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fistRoute: []
    }
    this.routeOrigAndDest = this.routeOrigAndDest.bind(this);
    this.findPortInfo = this.findPortInfo.bind(this);
  }

  componentDidMount() {
    this.routeOrigAndDest();
  }

  componentWillReceiveProps(nextProps) {
    if(_.isEqual(this.props.search, nextProps.search)) {
      return;
    }
    this.routeOrigAndDest();
  }

  routeOrigAndDest() {
    const { routes } = store.getState().search;
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

  render() {
    const { transports, allPorts } = this.props.search;
    const { firstRoute } = this.state;
    const { routes, routesStatus } = store.getState().search;

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
                        return <div>Search...</div>;
                    } else if(_.isEqual(routesStatus, 'success')) {
                      return (
                        _.map(routes.routes, (route, index) => (
                          <RouteDetail key={index} route={route} allPorts={allPorts} transports={transports} />
                        ))
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
