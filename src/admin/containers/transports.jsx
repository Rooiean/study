import _ from 'lodash';
import { connect } from 'react-redux';
import store from 'store';

import React, { Component } from 'react';
import { search } from 'actions';
import { Transport, DetailModal } from 'components/transport';
import { Cost } from 'components/cost';

import { Grid, Button, Input } from 'react-bootstrap';

import Select from 'react-select';

export class Transports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddModal: false,
      transInfos: [],
      options: [],
      startPort: '',
      endPort: '',
      startId: '',
      endId: '',
    }

    this.handleClickSearchTrans = this.handleClickSearchTrans.bind(this);
    this.getOptions =  this.getOptions.bind(this);
    this.setStartPort =  this.setStartPort.bind(this);
    this.setEndPort =  this.setEndPort.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(_.isEqual(nextProps.search.allPortsStatus, 'success')) {
      this.getOptions();
    }
  }

  getOptions() {
    const { allPorts } = store.getState().search;

    const ports = _.map(allPorts, port => {
      return { id: port.id, port: port.name + ' / ' + port.locationCode + ' / ' + port.countryCode + ' / ' + port.type }
    }).concat();

    this.setState({
      options: ports,
    });
  }

  setStartPort(e) {
    if (!_.isEmpty(e)) {
      this.setState({ startPort: e, startId:e.id });
    } else {
      this.setState({ startPort: '', startId: '' });
    }
  }

  setEndPort(e) {
    if (!_.isEmpty(e)) {
      this.setState({ endPort: e, endId:e.id });
    } else {
      this.setState({ endPort: '', endId:'' });
    }
  }

  handleClickSearchTrans() {
    const { transports } = this.props.search;
    const start = this.state.startId;
    const end = this.state.endId;
    let transInfoList = [];
    if(_.isEmpty(end)) {
      transInfoList = _.filter(transports, { 'sourcePort': start });
    } else if(_.isEmpty(start)) {
      transInfoList = _.filter(transports, { 'destinationPort': end });
    } else {
      transInfoList = _.filter(transports, { 'sourcePort': start, 'destinationPort': end });
    }

    this.setState({transInfos: transInfoList});
  }

  render() {
    const { allPorts, transports } = this.props.search;
    const { transInfos, options, startPort, endPort } = this.state;

    return (
      <Grid className="page-wrapper">
        <div className="tables">
          <h2 className="fl">Transports</h2>
          <div className="find-transport fr">
            <label>출발지</label>
            <div className="select-box">
              <Select
                name="start-port"
                valueKey="id"
                labelKey="port"
                options={options}
                placeholder="출발지"
                onChange={e => this.setStartPort(e)}
              	value={this.state.startPort}
              />
            </div>
            <label>도착지</label>
            <div className="select-box">
              <Select
                name="end-port"
                valueKey="id"
                labelKey="port"
                options={options}
                placeholder="도착지"
                onChange={e => this.setEndPort(e)}
              	value={this.state.endPort}
              />
            </div>
            <Button onClick={this.handleClickSearchTrans} bsStyle="primary">
              Search Transports
            </Button>
          </div>
          <hr className="cb" />
          <div className="th">
            <div className="sm-td">Id</div>
            <div>Type</div>
            <div className="lg-td">Name</div>
            <div>Cost($)</div>
            <div className="sm-td">Distance</div>
            <div className="md-td">Cycle</div>
            <div className="lg-td">sPort</div>
            <div className="lg-td">dPort</div>
            <div className="sm-td">Time</div>
            <div>Status</div>
            <div className="btns">Actions</div>
          </div>
          {
            _.map(transInfos, (transInfo, index) => {
              return <Transport key={index} transport={transInfo} allPorts={allPorts} />
            })
          }
          <DetailModal showModal={this.state.showAddModal} onHide={this.handleHideAddModal} />
        </div>
        <hr />
        <Cost />
      </Grid>
    );
  }
}

export default connect(state=>state)(Transports);
