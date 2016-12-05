import _ from 'lodash';
import React, { Component } from 'react';
import { Input } from 'react-bootstrap';
import { search } from 'actions';
import store from 'store';
import Select from 'react-select';

export default class SearchPortSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portState: 'ALL',
      options: [],
      options2: [],
      countryCode: '',
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
    const { portState, port, countryCode } = this.state;

    this.setState({
      portState: portType,
      port: '',
      countryCode: '',
      id: '',
     });

    store.dispatch(search.portSearch(portType, 'ALL')).then(() =>
      this.getOptions()
    );
  }

  getOptions() {
    const { data } = store.getState().search;

    const countries = _.uniqBy(_.map(data, _data => {
      return { countryCode: _data.countryCode, country: _data.countryCode }
    }).concat(), 'countryCode');

    const ports = _.map(data, _data => {
      return { id: _data.id, port: _data.name + ' / ' + _data.locationCode, country: _data.countryCode }
    }).concat();

    this.setState({
      options: ports,
      options2: countries,
     });
  }

  setCountry(e) {
    const { countryCode, portState, port } = this.state;
    this.setState({ countryCode: e, port: '' });
    if (!_.isEmpty(e)) {
      store.dispatch(search.portSearch(portState, e.country)).then(() =>
        this.getOptions()
      );
    } else {
      store.dispatch(search.portSearch(portState, 'ALL')).then(() =>
        this.getOptions()
      );
    }
	}

  setPort(e) {
    const { port, countryCode, id } = this.state;
    this.setState({ port: e, countryCode: e.country, id:e.id });
    console.log(e);
	}

  selectedPort() {
    return this.state.id;
  }

  render() {
    const { portState, options, options2, countryCode, port } = this.state;
    const { label } = this.props;
    const placeholder = '국가를 선택하세요.';
    const placeholder2 = '포트를 선택하세요.';

    return (
      <div>
        <label>{label}</label>
        <Input ref="portType" type="select" onChange={this.handleSelectPortType}>
          <option value="ALL">포트유형</option>
          <option value="AIRPORT">공항(Airport)</option>
          <option value="SEAPORT">항구(Seaport)</option>
        </Input>
        <label>국가</label>
        <Select
          name="form-field-name"
          valueKey="countryCode"
          labelKey="country"
          options={options2}
          placeholder={placeholder}
          onChange={e => this.setCountry(e)}
        	value={this.state.countryCode}
        />

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
          onChange={e => this.setPort(e)}
        	value={this.state.port}
        />
      </div>
    );
  }
}
