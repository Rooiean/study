import React, { Component } from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Menu extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect fixedTop className="menu">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Tradlinx Navigator</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/home">
              <NavItem><i className="fa fa-search" /> Search Route</NavItem>
            </LinkContainer>
            <LinkContainer to="/air">
              <NavItem><i className="fa fa-plane" /> Air Schedule</NavItem>
            </LinkContainer>
            <LinkContainer to="/ocean">
              <NavItem><i className="fa fa-ship" /> Ocean Schedule</NavItem>
            </LinkContainer>
            <LinkContainer to="/terminal">
              <NavItem><i className="fa fa-map-pin" /> Terminal Schedule</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
