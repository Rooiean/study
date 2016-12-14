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
    this.handleAddTransport = this.handleAddTransport.bind(this);
    this.handleDeleteTransport = this.handleDeleteTransport.bind(this);
  }

  componentDidMount() {
      this.cycleNumberToWeek();
  }

  cycleNumberToWeek() {
    const _cycle = !_.isEmpty(this.props.transport) ? this.props.transport.cycle : '0000000';

    this.setState({allWeekCheck: _cycle});
    const cycleNumbers = _.split(_cycle, '');
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
  }

  handleSaveTransport() {
    const { transport, ssport, ddport } = this.props || {};

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

    store.dispatch(trans.putTransport(id, name, sourcePort, destinationPort, type, scheduleList, cycle, cost, requiredTime, status));
  }

  handleAddTransport() {
    const name = this.refs.name.getValue();
    const sourcePort = this.refs.sPort.selectedPort();
    const destinationPort = this.refs.dPort.selectedPort();
    const type = this.refs.type.getValue();
    const scheduleList = this.refs.sList.getValue();
    const cycle = this.state.allWeekCheck;
    const cost = this.refs.cost.getValue()/803;
    const requiredTime = this.refs.rTime.getValue();
    const status = this.refs.status.getValue();

    store.dispatch(trans.postTransport(name, sourcePort, destinationPort, type, scheduleList, cycle, cost, requiredTime, status));
  }

  handleDeleteTransport() {
    const { id } = this.props.transport;
    store.dispatch(trans.delTransport(id));
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
    const { transport, sourcePort, destinationPort } = this.props || {};
    const { numberWeekState } = this.state;

    return (
      <Modal show={this.props.showModal} onHide={this.props.onHide} className="detail-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            { _.isEmpty(transport) ? '새로운 Transports 추가하기' : transport.name }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { !_.isEmpty(transport) && <label>Id : { transport.id }</label> }
          <div className="cb"/>
          <label>Type</label>
          <Input type="select" defaultValue={ !_.isEmpty(transport) ? transport.type : 'AIRCRAFT' } ref="type">
            <option value="AIRCRAFT">AIRCRAFT</option>
            <option value="VESSEL">VESSEL</option>
            <option value="TRUCK">TRUCK</option>
            <option value="RAIL">RAIL</option>
          </Input>
          <label>Name</label>
          {
            !_.isEmpty(transport) ?
            <Input type="text" defaultValue={ transport.name } ref="name" />
            :
            <Input type="text" placeholder="이름을 입력해주세요." ref="name" />
          }
          <label>Cost($)</label>
          {
            !_.isEmpty(transport) ?
              <Input type="text" defaultValue={ transport.cost } ref="cost" />
              :
              <Input type="text" placeholder="가격을 입력해주세요." ref="cost" />
          }
          <label>Distance</label>
          {
            !_.isEmpty(transport) &&
            <Input type="text" defaultValue={ transport.distance } ref="distance" />
          }
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
          <label>Source Port : { !_.isEmpty(sourcePort) ? sourcePort : '출발지를 검색하세요.' }</label>
          <PortSelector ref="sPort" />
          <hr />
          <label>Destination Port : { !_.isEmpty(destinationPort) ? destinationPort : '도착지를 검색하세요.' }</label>
          <PortSelector ref="dPort" />
          <hr />
          <label>Required Time(일)</label>
          {
            !_.isEmpty(transport) ?
              <Input type="text" defaultValue={ transport.requiredTime } ref="rTime" />
              :
              <Input type="text" placeholder="소요시간을 일 단위로 입력하세요." ref="rTime" />
          }

          <label>Status</label>
          <Input type="select" defaultValue={ !_.isEmpty(transport) ? transport.status : 'RUNNABLE' } ref="status">
            <option value="RUNNABLE">RUNNABLE</option>
            <option value="PAUSED">PAUSED</option>
            <option value="UNUSUAL">UNUSUAL</option>
            <option value="CLOSURE">CLOSURE</option>
            <option value="UNKNOWN">UNKNOWN</option>
          </Input>
          <label>Schedule List</label>
          <div>
            {
              (() => {
                if (_.isEmpty(transport)) {
                    return <Input ref="sList" type="text" />;
                } else {
                    return <Input ref="sList" type="text" defaultValue={ transport.scheduleList[0] } />;
                }
              })()
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="warning" className="fl" onClick={this.handleDeleteTransport}>삭제하기</Button>
          <Button onClick={this.props.onHide} className="fr">취소</Button>
          {
            (() => {
              if(_.isEmpty(transport)) {
                return <Button bsStyle="primary" className="fr" onClick={this.handleAddTransport}>추가하기</Button>;
              } else {
                return <Button bsStyle="primary" className="fr" onClick={this.handleSaveTransport}>수정하기</Button>;
              }
            })()
          }
          <div className="cb"/>
        </Modal.Footer>
      </Modal>
    );
  }
}
