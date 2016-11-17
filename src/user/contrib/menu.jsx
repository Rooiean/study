import React, { Component } from 'react';
import { Link } from 'react-router';
import { Navbar } from 'react-bootstrap';

export default class Menu extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect className="menu">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Tradlinx Navigator</Link>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}
