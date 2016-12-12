import _ from 'lodash';
import store from 'store';
import React, { Component } from 'react';

import { InputFieldOverlay } from '../../contrib';
import UserPortSelector from './user-port-selector';
import { search } from 'actions';

import { Panel, Input, Select, Button, Row, Col } from 'react-bootstrap';
import Slider from 'rc-slider';


export default class Search extends Component {
  constructor(props) {
    super(props);

    this.handleClickSearch = this.handleClickSearch.bind(this);
  }

  handleClickSearch() {
    const sport = this.refs.origin.selectedPort();
    const dport = this.refs.destination.selectedPort();
    const depth = '3';
    const cost = '10000';
    const term = '100';
    const fromdate = this.refs.oriDay.returnValue();


    store.dispatch(search.routeSearch(sport, dport, depth, cost, term, fromdate));
  }

  render() {
    const { routes, allPorts } = this.props.search;

    return (
      <form className="search-inputs">
        <Panel>
          <Row>
            <Col sm={12} md={5}>
              <div>
                <label>출발지</label>
                <UserPortSelector
                  allPorts={allPorts}
                  ref="origin"
                />
              </div>
            </Col>
            <Col sm={12} md={5}>
              <div>
                <label>도착지</label>
                <UserPortSelector
                  allPorts={allPorts}
                  ref="destination"
                />
              </div>
            </Col>
            <Col sm={12} md={2}>
              <label>
                출발날짜
              </label>
              <InputFieldOverlay ref="oriDay" />
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
