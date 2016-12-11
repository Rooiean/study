import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import Search from 'components/user/search';
import { SearchResult } from 'components/route';
import { Menu } from '../contrib';
import { search } from 'actions';

import { Grid } from 'react-bootstrap';

export class Home extends Component {

  componentDidMount() {
      this.props.dispatch(search.allPorts());
      this.props.dispatch(search.allTransports());
  }

  render() {
    const { search, dispatch } = this.props;
    return (
      <div>
        <Menu />
        <div className="header">
          <Grid>
            <Search search={search} dispatch={dispatch} />
          </Grid>
        </div>
        <Grid>
          { !_.isEmpty(search.routes) && <SearchResult search={search} /> }
        </Grid>
      </div>
    );
  }
}

export default connect(state => state)(Home);
