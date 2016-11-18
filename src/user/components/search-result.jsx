import _ from 'lodash';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.findPortInfo = this.findPortInfo.bind(this);
  }

  findPortInfo(queryText) {
    const { allPorts } = this.props.search;
    const portInfo = _.find(allPorts, { 'id': queryText });
    return <span>{ portInfo.name }({portInfo.locationCode}) / { portInfo.type }</span>;
  }

  render() {
    const { routes } = this.props.search;

    return (
      <div>
        <p>검색결과 : { routes.resultCount }건</p>
        {
          (() => {
            if (_.isEqual(routes.resultCount, 0)) {
                return <p>검색 결과가 없습니다.</p>;
            }

            return (
              <div className="search-result">
                <div className="search-th">
                  <span>출발포트</span>
                  <span>도착포트</span>
                  <span>환승</span>
                  <span>가격</span>
                  <span>기간</span>
                  <span>지도보기</span>
                </div>
                <ul className="search-body">
                  {
                    _.map(routes.routes, (route, index) => (
                      <li key={index}>
                        <div>
                          <span>{ this.findPortInfo(_.nth(route, 2)) }</span>
                          <span>{ this.findPortInfo(_.last(route)) }</span>
                          <span>{ (route.length - 5) / 2 } 번</span>
                          <span>$ { _.head(route) }</span>
                          <span>{ _.nth(route, 1) } 일</span>
                          <span><Button bsSize="medium">지도보기</Button></span>
                        </div>
                        <div>
                          지도
                        </div>
                      </li>
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
