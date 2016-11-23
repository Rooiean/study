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
