import React, { Component } from 'react';
import Polyline from './polyline';
import toPoints from './to-points';

export default class Group extends Component {
    render() {
        const ptCorner = this.props.ptCorner || toPoints(this.props.bounds[0], this.props.bounds[1], this.props.zoom);
        const polylines = [];
        for (var i = 0; i < this.props.coords.length; i++) {
            polylines.push(<Polyline
                coords={this.props.coords[i]}
                ptCorner={ptCorner}
                zoom={this.props.zoom} />);
        }
        return (<g {...this.props.options}>{polylines}</g>);
    }
}
