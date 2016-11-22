import React from 'react';
import { Menu } from '../contrib';
import { connect } from 'react-redux';

export class App extends React.Component {
  render() {
    return (
      <div className="page-wrapper">
        <div className="left-column">
          <Menu />
        </div>
        <div className="right-column">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(state => state)(App);
