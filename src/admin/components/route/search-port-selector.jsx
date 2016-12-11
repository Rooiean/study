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
      options: [],
      port: '',
      id: '',
    };

    this.getOptions = this.getOptions.bind(this);
    this.setPort = this.setPort.bind(this);
    this.selectedPort = this.selectedPort.bind(this);
  }

  componentDidMount() {
    store.dispatch(search.allPorts()).then(() =>
      this.getOptions()
    );
  }

  getOptions() {
    const { allPorts } = store.getState().search;

    const ports = _.map(allPorts, port => {
      return { id: port.id, port: port.name + ' / ' + port.locationCode + ' / ' + port.type }
    }).concat();

    this.setState({
      options: ports,
     });
  }

  setPort(e) {
    if(!_.isEmpty(e)) {
      this.setState({ port: e, id: e.id });
    } else {
      this.setState({ port: '', id: '' });
    }
	}

  selectedPort() {
    return this.state.id;
  }

  render() {
    const { options, port } = this.state;
    const placeholder2 = '포트를 선택하세요.';

    return (
      <div>
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
