import React from 'react';
import { Menu } from '../contrib';

export default class App extends React.Component {
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
