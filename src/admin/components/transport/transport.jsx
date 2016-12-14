import _ from 'lodash';
import React, { Component } from 'react';
import DetailModal from './detail-modal';
import DeleteModal from './delete-modal';
import { Button } from 'react-bootstrap';

export default class Transport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDetailModal: false,
      showDeleteModal: false,
    }

    this.findPortInfo = this.findPortInfo.bind(this);
    this.handleShowDetailModal = this.handleShowDetailModal.bind(this);
    this.handleShowDeleteModal = this.handleShowDeleteModal.bind(this);
    this.handleHideDetailModal = this.handleHideDetailModal.bind(this);
    this.handleHideDeleteModal = this.handleHideDeleteModal.bind(this);
  }

  findPortInfo(queryText) {
    const { allPorts } = this.props;
    const portInfo = _.find(allPorts, { 'id': queryText });
    return <span>{ portInfo.name }({portInfo.locationCode}) / { portInfo.type }</span>;
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
      if(_.isEqual(numberWeek.cycle, '1')) {
         return <span key={index}>{ numberWeek.oneOfWeek }</span>;
      } else {
        return null;
      }
    });

    return cycleNumberToWeeks;
  }

  handleShowDetailModal() {
    this.setState({showDetailModal: true});
  }

  handleHideDetailModal() {
    this.setState({showDetailModal: false})
  }

  handleShowDeleteModal() {
    this.setState({showDeleteModal: true});
  }

  handleHideDeleteModal() {
    this.setState({showDeleteModal: false})
  }

  render() {
    const { allPorts, transport } = this.props;
    const { showDetailModal, showDeleteModal } = this.state;
    return (
      <div>
        <div className="tbody">
          <div className="sm-td">{ transport.id }</div>
          <div className="td">{ transport.type }</div>
          <div className="lg-td">{ transport.name }</div>
          <div className="td">{ transport.cost }</div>
          <div className="td">{ transport.distance } km</div>
          <div className="md-td">{ this.cycleNumberToWeek(transport.cycle) }</div>
          <div className="lg-td">{ this.findPortInfo(transport.sourcePort) }</div>
          <div className="lg-td">{ this.findPortInfo(transport.destinationPort) }</div>
          <div className="sm-td">{ transport.requiredTime } 일</div>
          <div className="td">{ transport.status }</div>
          <div className="btns">
            <Button bsStyle="primary" onClick={this.handleShowDetailModal}>수정</Button>
            <Button bsStyle="warning" onClick={this.handleShowDeleteModal}>삭제</Button>
          </div>
        </div>
        { (showDetailModal) ?
          <DetailModal
            transport={transport}
            showModal={showDetailModal}
            onHide={this.handleHideDetailModal}
            allPorts={allPorts}
            sourcePort={ this.findPortInfo(transport.sourcePort) }
            ssPort={transport.sourcePort}
            destinationPort={ this.findPortInfo(transport.destinationPort) }
            ddPort={transport.destinationPort}
          /> : null }
        { (showDeleteModal) ?
          <DeleteModal
            transport={transport}
            showModal={showDeleteModal}
            onHide={this.handleHideDeleteModal}
          /> : null }
      </div>
    );
  }
}
