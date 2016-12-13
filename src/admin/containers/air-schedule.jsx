import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { SearchAir, SearchAirResult } from 'components/air'
import { air, search } from 'actions';

import { Grid } from 'react-bootstrap';

export class AirSchedule extends Component {
  componentDidMount() {
    this.props.dispatch(air.allAirPorts());
    this.props.dispatch(search.allPorts());
  }

  render() {
    const { air, dispatch } = this.props;
    return (
      <div>
        <div className="header user">
          <Grid>
            <SearchAir air={air} dispatch={dispatch} />
          </Grid>
        </div>
        <Grid>
          { !_.isEmpty(air.schedules) && <SearchAirResult air={air} /> }
        </Grid>
      </div>
    );
  }
}

export default connect(state => state)(AirSchedule);
