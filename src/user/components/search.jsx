import React, { Component } from 'react';
import { Panel, Input, Select, Button, Row, Col } from 'react-bootstrap';
import Rcslider from 'rc-slider';
import { PortSelector } from '../contrib';

export default class Search extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <form className="search-inputs">
        <Panel>
          <Row>
            <Col md={6}>
              <div>
                <h3>출발지</h3>
                <PortSelector
                  label={'출발지 유형'}
                />
              </div>
            </Col>
            <Col md={6}>
              <div>
                <h3>도착지</h3>
                <PortSelector
                  label={'도착지 유형'}
                />
              </div>
            </Col>
          </Row>
        </Panel>
        <Panel className="options">
          <label>
            최대 환승 수
          </label>
          <input type="number" />
          <label>
            최대 비용
          </label>
          <Input type="text" />원
          <label>
            최대 소요 시간
          </label>
          <Rcslider />일
        </Panel>
        <Button type="submit" bsSize="large">
          Search
        </Button>

      </form>
    );
  }
}
