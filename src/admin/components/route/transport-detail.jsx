import _ from 'lodash';
import React, { Component } from 'react';

export default class TransportDetail extends Component {
  constructor(props) {
    super(props);
    this.state={
      transDetail: {},
      transDates: '',
    }

    this.findTransportDetail = this.findTransportDetail.bind(this);
  }

  componentDidMount() {
      this.findTransportDetail();
  }

  componentWillReceiveProps(nextProps) {
    if(_.isEqual(this.props.pinfo, nextProps.pinfo)) {
      return;
    }
    this.findTransportDetail();
  }

  findTransportDetail() {
    const { transports, pinfo } = this.props;

    let transId = _.head(_.split(pinfo, ':'));
    let transDate = _.last(_.split(pinfo, ':'));

    const transInfo = _.find(transports, {'id': transId });

    this.setState({transDetail: transInfo, transDates: transDate});
  }

  render() {
    const { transDetail, transDates } = this.state;
    let timeWidth = _.isEqual(transDetail.type, 'VESSEL') ? { width: (60 * transDetail.requiredTime/3) + 'px', minWidth: '60px' } :  { width: '60px' };
    let dayOrTime = _.isEqual(transDetail.type, 'VESSEL') ? "일" : "시간";

    return (
      <li className={ transDetail.type } style={timeWidth}>
        <div className="trans-date">{ transDates }</div>
        <div>{ transDetail.type }</div>
        <div>{ transDetail.requiredTime }{ dayOrTime }</div>
      </li>
    );
  }
}
