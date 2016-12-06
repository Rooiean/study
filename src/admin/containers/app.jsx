import React from 'react';
import { Menu } from '../contrib';
import { connect } from 'react-redux';
import { search, costs } from 'actions';

export class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(search.allPorts());
    this.props.dispatch(search.allTransports());
    this.props.dispatch(costs.getCosts());
  }

  render() {
    return (
      <div>
        <Menu />
        {this.props.children}
      </div>
    );
  }
}

export default connect(state => state)(App);
