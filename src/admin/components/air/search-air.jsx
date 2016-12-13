import _ from 'lodash';
import store from 'store';
import React, { Component } from 'react';

import { InputFieldOverlay } from '../../contrib';
import AirPortSelect from './air-port-select';
import { air } from 'actions';

import { Panel, Input, Select, Button, Row, Col } from 'react-bootstrap';
import Slider from 'rc-slider';


export default class SearchAir extends Component {
  constructor(props) {
    super(props);

    this.handleClickSearch = this.handleClickSearch.bind(this);
  }

  handleClickSearch() {
    const fromdate = this.refs.oriDay.returnValue();
    let todate;
    const sport = this.refs.origin.selectedPort();
    const dport = this.refs.destination.selectedPort();

    store.dispatch(air.scheduleSearch(fromdate, todate, sport, dport));
  }

  render() {
    const { airport, schedules } = this.props.air;

    return (
      <form className="search-inputs">
        <Panel>
          <Row>
            <Col sm={12} md={5}>
              <div>
                <label>출발지</label>
                <AirPortSelect
                  airport={airport}
                  ref="origin"
                />
              </div>
            </Col>
            <Col sm={12} md={5}>
              <div>
                <label>도착지</label>
                <AirPortSelect
                  airport={airport}
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
          { _.isEmpty(schedules) ? <span>Search</span> : <span>Search Again</span> }
        </Button>

      </form>
    );
  }
}
