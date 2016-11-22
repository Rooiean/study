import React, { Component } from 'react';
import { Modal, Input, Button } from 'react-bootstrap';

export default class DetailModal extends Component {
  render() {
    const { transport } = this.props;
    return (
      <Modal show={this.props.showModal} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{ transport.name }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Id</label>
          <Input type="text" defaultValue={ transport.id } />
          <label>Type</label>
          <Input type="text" defaultValue={ transport.type } />
          <label>Name</label>
          <Input type="text" defaultValue={ transport.name } />
          <label>Cost</label>
          <Input type="text" defaultValue={ transport.cost } />
          <label>Cycle</label>
          <Input type="text" defaultValue={ transport.cycle } />
          <label>Source Port</label>
          <Input type="text" defaultValue={ transport.sourcePort } />
          <label>Destination Port</label>
          <Input type="text" defaultValue={ transport.destinationPort } />
          <label>Required Time</label>
          <Input type="text" defaultValue={ transport.requiredTime } />
          <label>Status</label>
          <Input type="text" defaultValue={ transport.status } />
          <label>Schedule List</label>
          {
            _.map(transport.scheduleList, (schedule, index) => {
              return <Input key={index} type="text" defaultValue={ schedule } />;
            })
          }
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="warning">삭제하기</Button>

          <Button bsStyle="primary">수정하기</Button>
          <Button onClick={this.props.onHide}>취소</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
