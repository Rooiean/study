import React, { Component } from 'react';
import toPoints from './to-points';

export default class Polyline extends Component {
    render() {
        const ptCorner = this.props.ptCorner || toPoints(this.props.bounds[0], this.props.bounds[1], this.props.zoom);
        const points = [];
        for (var i = 0; i < this.props.coords.length; i++) {
            const ptScreen = toPoints(this.props.coords[i].lat, this.props.coords[i].lng, this.props.zoom);
            const point = {
                x: ptScreen.x - ptCorner.x,
                y: ptScreen.y - ptCorner.y
            };
            points.push(point.x + ',' + point.y);
        }
        return <polyline points={points.join(' ')} {...this.props.options}/>;
    }
}
