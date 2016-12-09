import React from 'react';
import { AdminMenu } from '../contrib';
import { connect } from 'react-redux';
import { search } from 'actions';

export class AdminApp extends React.Component {
  componentDidMount() {
    this.props.dispatch(search.allPorts());
    this.props.dispatch(search.allTransports());
  }

  render() {
    return (
      <div>
        <AdminMenu />
        {this.props.children}
      </div>
    );
  }
}

export default connect(state => state)(AdminApp);
