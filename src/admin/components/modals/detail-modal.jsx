import _ from 'lodash';
import React, { Component } from 'react';
import { Modal, Input, Button } from 'react-bootstrap';
import { PortSelector } from '../../contrib';
import { trans } from 'actions';

export default class DetailModal extends Component {
  constructor(props) {
    super(props);

    this.cycleNumberToWeek = this.cycleNumberToWeek.bind(this);
    this.handleSaveTransport = this.handleSaveTransport.bind(this);
  }

  cycleNumberToWeek(cycle) {
    const cycleNumbers = _.split(cycle, '');
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    let numberWeeks = [];

    for(let i=0; i < cycleNumbers.length; i++) {
      const l = _.nth(cycleNumbers, i);
      const j = _.nth(week, i);

      numberWeeks.push({
        cycle: l,
        oneOfWeek: j,
      });
    }

    const cycleNumberToWeeks = _.map(numberWeeks, (numberWeek, index) => {
      console.log('week' + index);
       return (
         <span key={index}>
           <Input
             type="checkbox"
             ref={ 'week' + index }
             defaultChecked={_.isEqual(numberWeek.cycle, '1')}
             label={ numberWeek.oneOfWeek }
             onChange={this.weeekcheckChanged}
           />
         </span>
       );
    });

    return cycleNumberToWeeks;
  }

  handleSaveTransport() {
    const { transport } = this.props;

    const params = {
      type: this.refs.type.getValue(),
      name: this.refs.name.getValue(),
      cost: this.refs.cost.getValue(),
      cycle: this.refs.cycle.onChange(),
      sPort: this.refs.sPort.selectedPort(),
      dPort: this.refs.dPort.selectedPort(),
      rTime: this.refs.rTime.getValue(),
      status: this.refs.status.getValue(),
      sList: this.refs.sList.getValue(),
    }

    store.dispatch(trans.putTransport(transport.id, params));
  }

  handleCycleChanged() {
    const cycleChecked = [];
    for(let i=0; i < 7; i++) {
      const weekCheck = 'week' + i;
      const week = weekCheck.getValue();
      cycleChecked.push(week);
    }

    console.log(weekCheck, cycleChecked);
  }

  render() {
    const { transport, sourcePort, destinationPort } = this.props;
    return (
      <Modal show={this.props.showModal} onHide={this.props.onHide} className="detail-modal">
        <Modal.Header closeButton>
          <Modal.Title>{ transport.name }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Id : { transport.id }</label>
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
          <div className="check-boxes" ref="cycle" onChange={this.handleCycleChanged}>
            { this.cycleNumberToWeek(transport.cycle) }
          </div>
          <hr />
          <label>Source Port : { sourcePort }</label>
          <PortSelector ref="sPort"/>
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
          <div ref="sList">
            {
              _.map(transport.scheduleList, (schedule, index) => {
                return <Input key={index} type="text" defaultValue={ schedule } />;
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
