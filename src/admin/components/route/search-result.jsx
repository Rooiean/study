import _ from 'lodash';
import React, { Component } from 'react';
import SearchResultRoute from './search-result-route';

export default class SearchResult extends Component {

  render() {
    const { search } = this.props;
    const { routes } = search;

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
                <div className="search-th">
                  <span className="td sport">출발포트</span>
                  <span className="td dport">도착포트</span>
                  <span className="td depth">환승</span>
                  <span className="td cost">가격</span>
                  <span className="td term">기간</span>
                  <span className="td map-btn">Detail</span>
                </div>
                <ul className="list">
                {
                  _.map(routes.routes, (route, index) => (
                    <SearchResultRoute key={index} route={route} search={search}/>
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
