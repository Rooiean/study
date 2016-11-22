import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <h3><Link to="/admin"><i className="fa fa-user-circle-o" /> Admin</Link></h3>
        <ul>
          <li>
            <Link to="/admin/ports">
              <i className="fa fa-map-pin" />
              <span>Ports</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/transports">
              <i className="fa fa-plane" />
              <span>Transports</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/logs">
              <i className="fa fa-list-alt" />
              <span>Change Logs</span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
