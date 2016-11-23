import React, { Component } from 'react';
import Group from './group';
import Polyline from './polyline';
import toPoints from './to-points';

export default class Svg extends Component {
  render() {
    const coords = this.props.coordinates;
    if (coords.length == 0)
        return null;

    const ptCorner = toPoints(this.props.bounds[0], this.props.bounds[1], this.props.zoom);
    const props = this.props;

    function drawChildCoords(coords) {
        if (coords[0].hasOwnProperty('lat') && coords[0].hasOwnProperty('lng'))
            return <Polyline
                coords={coords}
                ptCorner={ptCorner}
                zoom={props.zoom}
                options={props.coordinates.options} />;

        var child = [];
        for (var i = 0; i < coords.length; i++) {
            if (Array.isArray(coords[i])) {
                if (Array.isArray(coords[i][0])) {
                    child.push(<Group
                        coords={coords[i]}
                        ptCorner={ptCorner}
                        zoom={props.zoom}
                        options={props.coordinates.options} />)
                } else {
                    child.push(drawChildCoords(coords[i]));
                }
            }
        }
        return child;
    }

    return (
        <svg
            height={this.props.height}
            width={this.props.width}>
            {drawChildCoords(coords)}
        </svg>
    );
  }
}
