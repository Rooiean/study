import _ from 'lodash';
import React, { Component } from 'react';
import { Panel, Input, Select, Button, Row, Col } from 'react-bootstrap';
import Slider from 'rc-slider';
import SearchPortSelector from './search-port-selector';
import { search } from 'actions';
import store from 'store';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.handleClickSearch = this.handleClickSearch.bind(this);
  }

  handleClickSearch() {
    const origin = this.refs.origin.selectedPort();
    const destination = this.refs.destination.selectedPort();
    const depth = this.refs.depth.getValue();
    const cost = this.refs.cost.getValue() * 3500000;
    const term = this.refs.term.getValue();

    store.dispatch(search.routeSearch(origin, destination, depth, cost, term));
  }

  render() {
    const { routes } = this.props.search;

    return (
      <form className="search-inputs">
        <Panel>
          <Row>
            <Col md={6}>
              <div>
                <h3>출발지</h3>
                <SearchPortSelector
                  label={'출발지 유형'}
                  ref="origin"
                />
              </div>
            </Col>
            <Col md={6}>
              <div>
                <h3>도착지</h3>
                <SearchPortSelector
                  label={'도착지 유형'}
                  ref="destination"
                />
              </div>
            </Col>
          </Row>
        </Panel>
        <Panel className="options">
          <Row>
            <Col md={4}>
              <label>
                최대 환승 수
              </label>
              <Input type="number" ref="depth"/>
            </Col>
            <Col md={4}>
              <label>
                최대 비용
              </label>
              <Slider allowCross={false} ref="cost"/>
            </Col>
            <Col md={4}>
              <label>
                최대 소요 시간
              </label>
              <Slider allowCross={false} ref="term"/>
            </Col>
          </Row>
        </Panel>
        <Button bsSize="large" bsStyle="success" onClick={this.handleClickSearch}>
          { _.isEmpty(routes) ? <span>Search</span> : <span>Search Again</span> }
        </Button>

      </form>
    );
  }
}