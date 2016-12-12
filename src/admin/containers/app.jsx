import React from 'react';
import { connect } from 'react-redux';
import { Menu } from '../contrib';

export class App extends React.Component {
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
