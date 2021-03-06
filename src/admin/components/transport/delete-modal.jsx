import React, { Component } from 'react';
import { Modal, Input, Button } from 'react-bootstrap';
import { trans } from 'actions';
import store from 'store';

export default class DetailModal extends Component {
  constructor(props) {
    super(props);

    this.handleDeleteTransport = this.handleDeleteTransport.bind(this);
  }

  handleDeleteTransport() {
    const { id } = this.props.transport;
    store.dispatch(trans.delTransport(id));
  }

  render() {
    const { transport } = this.props;

    return (
      <Modal show={this.props.showModal} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete { transport.name }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Id</label>
          <p>{ transport.id }</p>
          <label>Type</label>
          <p>{ transport.type }</p>
          <label>Name</label>
          <p>{ transport.name }</p>
          <label>Cost</label>
          <p>{ transport.cost }</p>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="warning" onClick={this.handleDeleteTransport}>삭제하기</Button>
          <Button onClick={this.props.onHide}>취소</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
