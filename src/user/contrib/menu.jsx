import React, { Component } from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Menu extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect className="menu">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Tradlinx Navigator</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/home">
              <NavItem>Route</NavItem>
            </LinkContainer>
            <LinkContainer to="/air">
              <NavItem>Air</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
