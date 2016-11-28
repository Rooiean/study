import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { Search, SearchResult } from 'components/route';
import { search } from 'actions';

import { Grid } from 'react-bootstrap';

export class SearchRoutes extends Component {
  render() {
    const { search } = this.props;
    return (
      <div className="page-wrapper">
        <div className="header">
          <Grid>
            <Search search={search} />
          </Grid>
        </div>
        <Grid>
          { !_.isEmpty(search.routes) && <SearchResult search={search} /> }
        </Grid>
      </div>
    );
  }
}

export default connect(state => state)(SearchRoutes);
