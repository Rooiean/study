import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { Search, SearchResult } from 'components/route';
import { search } from 'actions';

import { Grid } from 'react-bootstrap';

export class SearchRoutes extends Component {
  render() {
    const { search, dispatch } = this.props;
    const { routes } = this.props.search;

    return (
      <div className="page-wrapper">
        <div className="header">
          <Grid>
            <Search search={search} dispatch={dispatch} />
          </Grid>
        </div>
        <Grid>
          { !_.isEqual(search.routesStatus, 'waiting') && <SearchResult search={search} routes={routes} /> }
        </Grid>
      </div>
    );
  }
}

export default connect(state => state)(SearchRoutes);
