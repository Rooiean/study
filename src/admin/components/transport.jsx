import React, { Component } from 'react';
import { DetailModal, DeleteModal } from './modals';
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
    const { transport } = this.props;
    const { showDetailModal, showDeleteModal } = this.state;
    return (
      <div>
        <div className="tbody">
          <div className="small-td">{ transport.id }</div>
          <div>{ transport.type }</div>
          <div className="name">{ transport.name }</div>
          <div>{ transport.cost }</div>
          <div>{ transport.cycle }</div>
          <div className="small-td">{ transport.sourcePort }</div>
          <div className="small-td">{ transport.destinationPort }</div>
          <div className="r-time">{ transport.requiredTime }</div>
          <div>{ transport.status }</div>
          <div className="btns">
            <Button bsStyle="primary" onClick={this.handleShowDetailModal}>수정</Button>
            <Button bsStyle="warning" onClick={this.handleShowDeleteModal}>삭제</Button>
          </div>
        </div>
        { (showDetailModal) ? <DetailModal transport={transport} showModal={showDetailModal} onHide={this.handleHideDetailModal}/> : null }
        { (showDeleteModal) ? <DeleteModal transport={transport} showModal={showDeleteModal} onHide={this.handleHideDeleteModal}/> : null }
      </div>
    );
  }
}
