import _ from 'lodash';
import React, { Component } from 'react';
import { Input, Row, Col } from 'react-bootstrap';
import { search } from 'actions';
import store from 'store';
import Select from 'react-select';

export default class PortSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portState: 'ALL',
      options: [],
      port: '',
    };

    this.handleSelectPortType = this.handleSelectPortType.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  componentDidMount() {
    store.dispatch(search.allPorts()).then(() =>
      this.getOptions()
    );
  }

  handleSelectPortType() {
    const portType = this.refs.portType.getValue();
    const { portState, port, value } = this.state;

    this.setState({
      portState: portType,
      port: '',
      id: '',
     });

    store.dispatch(search.portSearch(portType, 'ALL')).then(() =>
      this.getOptions()
    );
  }

  getOptions() {
    const { allPorts } = this.props;

    const ports = _.map(allPorts, _data => {
      return { id: _data.id, port: _data.name + ' / ' + _data.locationCode + ' / ' + _data.countrycode,  }
    }).concat();

    this.setState({
      options: ports,
     });
  }

  setPort(e) {
    const { port, id } = this.state;
    this.setState({ port: e, id:e.id });
	}

  selectedPort() {
    return this.state.id;
  }

  render() {
    const { portState, options, port } = this.state;
    const placeholder2 = '포트를 선택하세요.';

    return (
      <Row className="port-selector">
        <Col sm={12} md={6}>
          <label>포트유형</label>
          <Input ref="portType" type="select" onChange={this.handleSelectPortType}>
            <option value="ALL">포트유형</option>
            <option value="AIRPORT">공항(Airport)</option>
            <option value="SEAPORT">항구(Seaport)</option>
          </Input>
        </Col>
        <Col sm={12} md={6}>
          {
            (() => {
              if (_.isEqual(portState, 'AIRPORT')) {
                return <label>공항</label>;
              } else if (_.isEqual(portState, 'SEAPORT')) {
                return <label>항구</label>;
              } else {
                return <label>포트</label>;
              }
            })()
          }
          <Select
            name="form-field-name"
            valueKey="id"
            labelKey="port"
            options={options}
            placeholder={placeholder2}
            onChange={e=> this.setPort(e)}
          	value={this.state.port}
          />
        </Col>
      </Row>
    );
  }
}
