import React, { Component } from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class AdminMenu extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect fixedTop className="menu">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/admin"><i className="fa fa-user-circle-o" /> Admin</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/admin/search">
              <NavItem>
                <i className="fa fa-list-alt" />
                <span>Search Routes</span>
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/admin/ports">
              <NavItem>
                <i className="fa fa-map-pin" />
                <span>Ports</span>
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/admin/transports">
              <NavItem>
                <i className="fa fa-plane" />
                <span>Transports</span>
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/admin/scrapper">
              <NavItem>
                <i className="fa fa-area-chart" />
                <span>Scraper</span>
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
