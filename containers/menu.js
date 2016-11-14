import React, {Component} from 'react';
import { Link } from 'react-router';

export default class Menus extends Component {
  render() {
    return(
      <div className="menu">
        <ul>
          <li>
            <Link to="/">Admin</Link>
          </li>
          <li>
            <Link to="ports">Ports</Link>
          </li>
          <li>
            <Link to="transports">Transports</Link>
          </li>
          <li>
            <Link to="logs">Change Logs</Link>
          </li>
        </ul>
      </div>
    );
  }
}
