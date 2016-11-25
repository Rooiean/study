import _ from 'lodash';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import { search } from 'actions';
import { Transport, DetailModal } from 'components/transport';

import { Button, Input } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

export class Transports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddModal: false,
      limit: 30,
      offset: 0,
      data: [],
      pageNum: 8,
    }

    this.handleShowAddModal = this.handleShowAddModal.bind(this);
    this.handleHideAddModal = this.handleHideAddModal.bind(this);
    this.setPagination = this.setPagination.bind(this);
  }

  componentDidMount() {
    this.setPagination();
  }

  handleShowAddModal() {
    this.setState({showAddModal:true});
  }

  handleHideAddModal() {
    this.setState({showAddModal:false});
  }

  setPagination() {
    const { transports } = this.props.search;
    this.setState({
      data: transports,
      pageNum: Math.ceil(transports.length / this.state.limit),
    });
    console.log(transports, this.state.data, this.state.pageNum);
  }

  handlePageClick() {
    const { data } = this.state;
    let selected = data.selected;
    let offsetNum =  Math.ceil(selected * this.state.limit);

    this.setState({offset: offsetNum}, () => {
      this.setPagination();
    });
  }

  render() {
    const { allPorts, transports } = this.props.search;
    const { data } = this.state;

    return (
      <div className="tables">
        <h2 className="fl">Transports</h2>
        <div className="table-actions fr">
          <Button className="add" bsStyle="primary" onClick={this.handleShowAddModal}>새로운 Transport 추가하기</Button>
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
          _.map(data, (_data, index) => {
            return <Transport key={index} transport={_data} allPorts={allPorts} />
          })
        }
        <DetailModal showModal={this.state.showAddModal} onHide={this.handleHideAddModal} />
        <ReactPaginate previousLabel={"prev"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageNum={this.state.pageNum}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       clickCallback={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"}
                       perPage={8}
                     />
      </div>
    );
  }
}

export default connect(state=>state)(Transports);
