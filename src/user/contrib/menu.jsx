import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Menus extends Component {
  render() {
    return (
      <div className="menu">
        <h3><Link to="/"><i className="fa fa-user-circle-o" /> Admin</Link></h3>
        <ul>
          <li>
            <Link to="ports">
              <i className="fa fa-map-pin" />
              <span>Ports</span>
            </Link>
          </li>
          <li>
            <Link to="transports">
              <i className="fa fa-plane" />
              <span>Transports</span>
            </Link>
          </li>
          <li>
            <Link to="logs">
              <i className="fa fa-list-alt" />
              <span>Change Logs</span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
