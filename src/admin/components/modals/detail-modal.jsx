import _ from 'lodash';
import React, { Component } from 'react';
import { Modal, Input, Button } from 'react-bootstrap';
import { PortSelector } from '../../contrib';
import { search, trans } from 'actions';
import store from 'store';

export default class DetailModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberWeekState: [],
      allWeekCheck: {},
    }

    this.cycleNumberToWeek = this.cycleNumberToWeek.bind(this);
    this.handleSaveTransport = this.handleSaveTransport.bind(this);
    this.checkboxChanged = this.checkboxChanged.bind(this);
  }

  componentDidMount() {
      this.cycleNumberToWeek();
  }

  cycleNumberToWeek() {
    const { cycle } = this.props.transport;
    this.setState({allWeekCheck: cycle});
    const cycleNumbers = _.split(cycle, '');
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const weekEn = ['sun', 'mon', 'tue', 'wen', 'thr', 'fri', 'sat'];
    let numberWeeks = [];

    for(let i=0; i < cycleNumbers.length; i++) {
      const l = _.nth(cycleNumbers, i);
      const j = _.nth(week, i);
      const s = _.nth(weekEn, i);

      numberWeeks.push({
        cycle: l,
        oneOfWeek: j,
        weekEn: s,
      });
    }

    this.setState({ numberWeekState: numberWeeks })
    console.log(numberWeeks);
  }

  handleSaveTransport() {
    const { transport, ssport, ddport } = this.props;

    const id = transport.id;
    const name = this.refs.name.getValue();
    const sourcePort = this.refs.sPort.selectedPort() || this.props.ssPort;
    const destinationPort = this.refs.dPort.selectedPort() || this.props.ddPort;
    const type = this.refs.type.getValue();
    const scheduleList = this.refs.sList.getValue();
    const cycle = this.state.allWeekCheck;
    const cost = this.refs.cost.getValue()/803;
    const requiredTime = this.refs.rTime.getValue();
    const status = this.refs.status.getValue();

    store.dispatch(trans.putTransport(id, name, sourcePort, destinationPort, type, scheduleList, cycle, cost, requiredTime, status)).then(
      () => {
        store.dispatch(search.allTransports());
      }
    );
  }

  checkboxChanged() {
    const sun = this.refs.sun.getChecked();
    const mon = this.refs.mon.getChecked();
    const tue = this.refs.tue.getChecked();
    const wen = this.refs.wen.getChecked();
    const thr = this.refs.thr.getChecked();
    const fri = this.refs.fri.getChecked();
    const sat = this.refs.sat.getChecked();

    let checkedweek = [sun, mon, tue, wen, thr, fri, sat];

    const checkedcheck = _.map(checkedweek, checkedwee => {
      if(checkedwee) {
        return '1';
      } else {
        return '0';
      }
    });

    const somechecked = _.join(checkedcheck, '');
    this.setState({allWeekCheck: somechecked})
  }

  render() {
    const { transport, sourcePort, destinationPort } = this.props;
    const { numberWeekState } = this.state;
    return (
      <Modal show={this.props.showModal} onHide={this.props.onHide} className="detail-modal">
        <Modal.Header closeButton>
          <Modal.Title>{ transport.name }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Id : { transport.id }</label>
          <div className="cb"/>
          <label>Type</label>
          <Input type="select" defaultValue={ transport.type } ref="type">
            <option value="AIRCRAFT">AIRCRAFT</option>
            <option value="VESSEL">VESSEL</option>
            <option value="TRUCK">TRUCK</option>
            <option value="RAIL">RAIL</option>
          </Input>
          <label>Name</label>
          <Input type="text" defaultValue={ transport.name } ref="name"/>
          <label>Cost($)</label>
          <Input type="text" defaultValue={ transport.cost } ref="cost"/>
          <label>Distance</label>
          <Input type="text" defaultValue="Distance" ref="distance" />
          <label>Cycle</label>
          <div className="check-boxes">
          {
            _.map(numberWeekState, (numberWeek, index) => {
               return (
                 <Input
                   key={index}
                   ref={numberWeek.weekEn}
                   type="checkbox"
                   defaultChecked={_.isEqual(numberWeek.cycle, '1')}
                   label={ numberWeek.oneOfWeek }
                   onChange={this.checkboxChanged}
                 />
               );
            })
          }
          </div>
          <hr />
          <label>Source Port : { sourcePort }</label>
          <PortSelector ref="sPort" />
          <hr />
          <label>Destination Port : { destinationPort }</label>
          <PortSelector ref="dPort" />
          <hr />
          <label>Required Time(일)</label>
          <Input type="text" defaultValue={ transport.requiredTime } ref="rTime" />

          <label>Status</label>
          <Input type="select" defaultValue={ transport.status } ref="status">
            <option value="RUNNABLE">RUNNABLE</option>
            <option value="PAUSED">PAUSED</option>
            <option value="UNUSUAL">UNUSUAL</option>
            <option value="CLOSURE">CLOSURE</option>
            <option value="UNKNOWN">UNKNOWN</option>
          </Input>
          <label>Schedule List</label>
          <div>
            {
              _.map(transport.scheduleList, (schedule, index) => {
                return <Input key={index} ref="sList" type="text" defaultValue={ schedule } />;
              })
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="warning" className="fl">삭제하기</Button>
          <Button onClick={this.props.onHide} className="fr">취소</Button>
          <Button bsStyle="primary" className="fr" onClick={this.handleSaveTransport}>수정하기</Button>
          <div className="cb"/>
        </Modal.Footer>
      </Modal>
    );
  }
}
