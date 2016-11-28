import React from 'react';
import { Menu } from '../contrib';
import { connect } from 'react-redux';
import { search } from 'actions';

export class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(search.allPorts());
    this.props.dispatch(search.allTransports());
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
