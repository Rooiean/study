import _ from 'lodash';
import React, { Component } from 'react';
import { Input } from 'react-bootstrap';
import { search } from 'actions';
import store from 'store';
import Select from 'react-select';

export default class PortSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portState: 'default',
      options: [],
      value: '',
    };

    this.handleSelectPortType = this.handleSelectPortType.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  componentDidMount() {
    store.dispatch(search.portSearch()).then(() =>
      this.getOptions()
    );
  }

  handleSelectPortType() {
    const portType = this.refs.portType.getValue();
    const { portState } = this.state;

    this.setState({ portState: portType });
  }

  getOptions() {
    const { data } = store.getState().search;
    console.log(data);
    this.setState({ options: data });
  }

  setValue(e) {
    const { value } = this.state;
    this.setState({value: e.name });
    console.log('Support level selected:', e.name);
	}

  render() {
    const { portState, options, vlaue } = this.state;
    const { label } = this.props;
    const placeholder = '국가를 선택하세요.';

    return (
      <div>
        <label>{label}</label>
        <Input ref="portType" type="select" onChange={this.handleSelectPortType}>
          <option value="default">포트유형</option>
          <option value="airport">공항(Airport)</option>
          <option value="seaport">항구(Seaport)</option>
        </Input>
        <label>국가</label>
        <Select
          name="form-field-name"
          valueKey="id"
          labelKey="name"
          options={options}
          placeholder={placeholder}
          onChange={e =>this.setValue(e)}
        	value={this.state.value}
        />

        {
          (() => {
            if (_.isEqual(portState, 'default')) {
              return <label>포트</label>;
            } else if (_.isEqual(portState, 'airport')) {
              return <label>공항</label>;
            } else if (_.isEqual(portState, 'seaport')) {
              return <label>항구</label>;
            }
          })()
        }
        <Select
          name="form-field-name"
          valueKey="id"
          labelKey="name"
          options={options}
          placeholder={placeholder}
          onChange={e=> this.setValue(e)}
        	value={this.state.value}
        />
      </div>
    );
  }
}
