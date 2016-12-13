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
    };
  }


  setPort(e) {
    if(!_.isEmpty(e)) {
      const { port, id } = this.state;
      this.setState({ port: e, id: e.id });
    } else {
      this.setState({ port: '', id: '' });
    }
	}

  selectedPort() {
    return this.state.id;
  }

  render() {
    const { airport } = this.props;
    let options = _.map(airport, _airport => ({ id: _airport.id, name: _airport.name + ' / ' +  _airport.code + ' / ' +  _airport.countryCode }));

    return (
      <Row className="port-selector">
        <Col xs={12}>
          <Select
            name="form-field-name"
            valueKey="id"
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
