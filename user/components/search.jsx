import _ from 'lodash';
import store from 'store';
import React, { Component } from 'react';

import { PortSelector, InputFieldOverlay } from '../contrib';
import { search } from 'actions';

import { Panel, Input, Select, Button, Row, Col } from 'react-bootstrap';
import Slider from 'rc-slider';


export default class Search extends Component {
  constructor(props) {
    super(props);

    this.handleClickSearch = this.handleClickSearch.bind(this);
  }

  handleClickSearch() {
    const origin = this.refs.origin.selectedPort();
    const destination = this.refs.destination.selectedPort();
    const oriDay = this.refs.oriDay.returnValue();
    const desDay = this.refs.desDay.returnValue();
    const cost = this.refs.cost.getChecked();
    const distance = this.refs.distance.getChecked();
    const term = this.refs.term.getChecked();

    console.log(origin, destination, oriDay, desDay, cost, distance, term);
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
                <PortSelector
                  label={'출발지 유형'}
                  ref="origin"
                />
              </div>
            </Col>
            <Col md={6}>
              <div>
                <h3>도착지</h3>
                <PortSelector
                  label={'도착지 유형'}
                  ref="destination"
                />
              </div>
            </Col>
          </Row>
        </Panel>
        <Panel className="options">
          <h3>추가 선택사항</h3>
          <Row>
            <Col md={4}>
              <label>
                출발날짜
              </label>
              <InputFieldOverlay ref="oriDay" />
            </Col>
            <Col md={4}>
              <label>
                도착날짜
              </label>
              <InputFieldOverlay ref="desDay" />
            </Col>
            <Col md={4}>
              <label>
                선호사항
              </label>
              <div className="more-options">
                <Input ref="cost" type="checkbox" label="가격" defaultCheck="false" />
                <Input ref="distance" type="checkbox" label="거리" defaultCheck="false" />
                <Input ref="term" type="checkbox" label="시간" defaultCheck="false" />
              </div>
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
