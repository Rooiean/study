import _ from 'lodash';
import React, { Component } from 'react';
import { Input, Row, Col } from 'react-bootstrap';
import { search } from 'actions';
import store from 'store';
import Select from 'react-select';

export default class AirPortSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      port: '',
      coder: '',
    };
  }


  setPort(e) {
    if(!_.isEmpty(e)) {
      const { port, code } = this.state;
      this.setState({ port: e, code: e.code });
    } else {
      this.setState({ port: '', code: '' });
    }
	}

  selectedPort() {
    return this.state.code;
  }

  render() {
    const { airport } = this.props;
    let options = _.map(airport, _airport => ({ code: _airport.code, name: _airport.name + ' / ' +  _airport.code + ' / ' +  _airport.countryCode }));

    return (
      <Row className="port-selector">
        <Col xs={12}>
          <Select
            name="form-field-name"
            valueKey="code"
            labelKey="name"
            options={options}
            placeholder='공항을 선택하세요.'
            onChange={e=> this.setPort(e)}
          	value={this.state.port}
          />
        </Col>
      </Row>
    );
  }
}
