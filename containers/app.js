import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Menu from './menu';

export default class App extends Component {
  render() {
    return (
      <Grid>
        <Col md={3}>
          <Menu/>
        </Col>
        <Col md={9}>
          {this.props.children}
        </Col>
      </Grid>
    );
  }
}
