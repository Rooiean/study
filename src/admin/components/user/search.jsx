import _ from 'lodash';
import store from 'store';
import React, { Component } from 'react';

import { InputFieldOverlay } from '../../contrib';
import PortSelector from './port-selector';
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
    const fromdate = this.refs.oriDay.returnValue();

    store.dispatch(search.routeSearch(sport, dport, fromdate));
  }

  render() {
    const { routes, allPorts } = this.props.search;

    return (
      <form className="search-inputs">
        <Panel>
          <Row>
            <Col md={4}>
              <div>
                <h3>출발지</h3>
                <PortSelector
                  allPorts={allPorts}
                  label={'출발지 유형'}
                  ref="origin"
                />
              </div>
            </Col>
            <Col md={4}>
              <div>
                <h3>도착지</h3>
                <PortSelector
                  allPorts={allPorts}
                  label={'도착지 유형'}
                  ref="destination"
                />
              </div>
            </Col>
            <Col md={4}>
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
