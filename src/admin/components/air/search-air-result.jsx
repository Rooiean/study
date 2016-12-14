import _ from 'lodash';
import React, { Component } from 'react';
import store from 'store';
import Schedule from './schedule';

export default class SearchAirResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fistRoute: [],
    }
    this.routeOrigAndDest = this.routeOrigAndDest.bind(this);
  }

  componentDidMount() {
    this.routeOrigAndDest();
  }

  componentWillReceiveProps(nextProps) {
    if(_.isEqual(this.props.air, nextProps.air)) {
      return;
    }
    this.routeOrigAndDest();
  }

  routeOrigAndDest() {
    const { schedules } = this.props.air;
    const { firstRoute } = this.state;
    let routeFirst = [];
    if(!_.isEmpty(schedules)) {
      routeFirst = _.nth(schedules, 0);
      this.setState({firstRoute:routeFirst});
    }
  }

  render() {
    const { schedules, airport, scheduleStatus } = this.props.air;
    const { firstRoute } = this.state;

    return (
      <div className="result-container">
        <h4 className="count">검색결과 : <em>{ schedules.length }</em>건</h4>

        {
          (() => {
            if (_.isEqual(schedules.length, 0)) {
                return (
                  <div>
                    <hr className="cb" />
                    <p className="no-result">검색 결과가 없습니다.</p>;
                  </div>
                )
            }

            return (
              <div className="search-result">
                {
                  (() => {
                    if(!_.isEmpty(firstRoute)) {
                        return(
                          <div className="air-start-end">
                            <div className="circle">조회 구간</div>
                            <div className="start">
                              { firstRoute.srcPortName } / { firstRoute.srcCountryCode }
                            </div>
                            <div className="mid-line" />
                            <div className="end">
                              { firstRoute.dstPortName } / { firstRoute.dstCountryCode }
                            </div>
                          </div>
                        );
                    }
                  })()
                }

                <div className="route-box">
                  <div className="tables">
                    <div className="th">
                      <div className="air-td">Carrier</div>
                      <div className="air-td">Origin</div>
                      <div className="air-td">Destination</div>
                      <div className="air-td">Flight</div>
                      <div className="air-td">Transport Time</div>
                      <div className="air-td">Detail</div>
                    </div>

                    {
                      (() => {
                        if(_.isEqual(scheduleStatus, 'request')) {
                            return <div className="loading">Search...</div>;
                        } else if(_.isEqual(scheduleStatus, 'success')) {
                          return (
                            _.map(schedules, (schedule, index) => {
                              return (
                                <Schedule schedule={schedule} key={index} />
                              );
                            })
                          );
                        } else {
                          return null;
                        }
                      })()
                    }
                  </div>
                </div>
              </div>
            );
          })()
        }

      </div>
    );
  }
}
