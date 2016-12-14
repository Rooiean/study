import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { search } from 'actions';
import { Port } from 'components/port';
import { Grid, Button, Input } from 'react-bootstrap';


export class Ports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portList: [],
      country: [],
    }

    this.handleFindByPortType = this.handleFindByPortType.bind(this);
    this.getCountryOptions = this.getCountryOptions.bind(this);
    this.handleFindByCountryType = this.handleFindByCountryType.bind(this);
  }

  componentDidMount() {
    if(!_.isEmpty(this.props.search.allPorts)) {
      this.getCountryOptions();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!_.isEqual(this.props.search.allPorts, nextProps.search.allPorts)) {
      this.getCountryOptions();
    }
  }

  handleFindByPortType() {
    const { allPorts } = this.props.search;
    const { portList } = this.state;
    const portType = this.refs.portType.getValue();
    let portInfoList = [];
    if(_.isEqual(portType, 'ALL') && (_.isEmpty(portList))) {
      portInfoList = allPorts;
    } else if(_.isEmpty(portList)) {
      portInfoList = _.filter(allPorts, { 'type': portType });
    } else {
      portInfoList = _.filter(portList, { 'type': portType });
    }

    this.setState({portList: portInfoList});
  }

  getCountryOptions() {
    const { allPorts } = this.props.search;
    const countries = _.uniqBy(_.map(allPorts, _data => {
      return { value: _data.countryCode, countryCode: _data.countryCode }
    }).concat(), 'value');

    this.setState({ country: countries });
  }

  handleFindByCountryType() {
    const { allPorts } = this.props.search;
    const { portList } = this.state;
    const countryType = this.refs.countryType.getValue();
    let portInfoList = [];
    if(_.isEqual(countryType, 'ALL') && (_.isEmpty(portList))) {
      portInfoList = allPorts;
    } else if(_.isEmpty(portList)) {
      portInfoList = _.filter(allPorts, { 'countryCode': countryType });
    } else {
      portInfoList = _.filter(portList, { 'countryCode': countryType });
    }

    this.setState({portList: portInfoList});
  }

  render() {
    const { allPorts } = this.props.search;
    const { portList, country } = this.state;

    return (
      <Grid className="page-wrapper">
        <div className="tables">
          <h2 className="fl">Ports</h2>
          <div className="find-transport fr">
            <label>Port type</label>
            <div className="select-box">
              <Input type="select"
                ref="portType"
                onChange={this.handleFindByPortType}
                defaultValue={"ALL"}
              >
                <option value="ALL">ALL</option>
                <option value="AIRPORT">AIRPORT</option>
                <option value="SEAPORT">SEAPORT</option>
              </Input>
            </div>
            <label>Country</label>
            <div className="select-box">
              <Input type="select"
                ref="countryType"
                defaultValue={"ALL"}
                onChange={this.handleFindByCountryType}
              >
                <option value="ALL">ALL</option>
                {
                  (() => {
                    if(!_.isEmpty(country)) {
                      return (
                        _.map(country, (con, index) => {
                          return <option vlaue={con.vlaue} key={index}>{con.countryCode}</option>
                        })
                      );
                    }
                  })()
                }
              </Input>
            </div>
          </div>
          <hr className="cb" />
          <div className="th">
            <div className="port-td">Id</div>
            <div className="port-td">Type</div>
            <div className="port-td">Name</div>
            <div className="port-td">Country</div>
            <div className="port-td">Location</div>
            <div className="port-td">LatLng</div>
          </div>
          {
            (() => {
              if(_.isEmpty(portList)) {
                return (
                  _.map(allPorts, (port, index) => {
                    return <Port key={index} port={port} />
                  })
                );

              } else {
                return(
                  _.map(portList, (port, index) => {
                    return <Port key={index} port={port} />
                  })
                );
              }
            })()
          }
        </div>
      </Grid>
    );
  }
}

export default connect(state=>state)(Ports);
