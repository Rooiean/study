import React, { Component } from 'react';
import { Search } from '../components';
import { Grid } from 'react-bootstrap';

export default class Home extends Component {
  render() {
    return (
      <div className="header">
        <Grid>
          <Search />
        </Grid>
      </div>
    );
  }
}
