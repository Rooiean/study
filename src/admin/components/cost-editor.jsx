import _ from 'lodash';
import React, {Component} from 'react';
import store from 'store';

import { costs as costAction } from 'actions';
import { Well, Input, Button } from 'react-bootstrap';

export default class CostEditor extends Component {
  constructor(props) {
    super(props);

    this.handlePutCost = this.handlePutCost.bind(this);
  }

  handlePutCost() {
    const air = this.refs.air.getValue();
    const sea = this.refs.sea.getValue();
    const road = this.refs.road.getValue();
    const rail = this.refs.rail.getValue();

    store.dispatch(costAction.putCosts(air, sea, road, rail));
  }

  render() {
    const { cost } = this.props;
    let firstCost = _.nth(cost, 0);
    return (
      <Well>
        <h4>Air</h4>
        <Input type="text" ref="air" defaultValue={firstCost.air} />

        <h4>Sea</h4>
        <Input type="text" ref="sea" defaultValue={firstCost.sea} />

        <h4>Road</h4>
        <Input type="text" ref="road" defaultValue={firstCost.road} />

        <h4>Rail</h4>
        <Input type="text" ref="rail" defaultValue={firstCost.rail} />

        <Button bsSize="large" bsStyle="primary" onClick={this.handlePutCost}>SAVE</Button>
      </Well>
    );
  }
}
