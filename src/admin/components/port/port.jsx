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

    this.handleShowDetailModal = this.handleShowDetailModal.bind(this);
    this.handleShowDeleteModal = this.handleShowDeleteModal.bind(this);
    this.handleHideDetailModal = this.handleHideDetailModal.bind(this);
    this.handleHideDeleteModal = this.handleHideDeleteModal.bind(this);
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
    const { port } = this.props;
    const { showDetailModal, showDeleteModal } = this.state;
    return (
      <div>
        <div className="sm-td">Id</div>
        <div>Type</div>
        <div className="lg-td">Name</div>
        <div>Country</div>
        <div className="sm-td">Location</div>
        <div className="lg-td">LatLng</div>
        <div className="lg-td">Arrival</div>
        <div className="sm-td">Departure</div>
        <div className="btns">Actions</div>

        <div className="tbody">
          <div className="sm-td">{ port.id }</div>
          <div>{ port.type }</div>
          <div className="lg-td">{ port.name }</div>
          <div>{ port.countryCode }</div>
          <div className="sm-td">{ port.locationCode }</div>
          <div className="md-td">{ port.latitude }, { port.longitude }</div>
          <div className="lg-td">{ this.findPortInfo(transport.sourcePort) }</div>
          <div className="lg-td">{ this.findPortInfo(transport.destinationPort) }</div>
          <div className="sm-td">{ transport.requiredTime } 일</div>
          <div>{ transport.status }</div>
          <div className="btns">
            <Button bsStyle="primary" onClick={this.handleShowDetailModal}>수정</Button>
            <Button bsStyle="warning" onClick={this.handleShowDeleteModal}>삭제</Button>
          </div>
        </div>
        { (showDetailModal) ?
          <DetailModal
            port={port}
            showModal={showDetailModal}
            onHide={this.handleHideDetailModal}
          /> : null }
        { (showDeleteModal) ?
          <DeleteModal
            port={port}
            showModal={showDeleteModal}
            onHide={this.handleHideDeleteModal}
          /> : null }
      </div>
    );
  }
}
