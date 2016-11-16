import React, { Component } from 'react';
import { Input, Label, Button } from 'react-bootstrap';
import Rcslider from 'rc-slider';

export default class Search extends Component {
  render() {
    return (
      <form className="search-inputs">
        <div>
          <Label>Origin</Label>
          <Input type="text" bsSize="large" />
        </div>
        <div>
          <Label>Destination</Label>
          <Input type="text" bsSize="large" />
        </div>
        <div className="others">
          <span>
            Limit Depth
          </span>
          <input type="number" />
          <span>
            Cost Limit
          </span>
          <Rcslider range={30} />
          <span>
            Term Limit
          </span>
          <input type="text" />일
        </div>
        <Button type="submit">
          Search
        </Button>
      </form>
    );
  }
}
