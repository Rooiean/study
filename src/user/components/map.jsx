import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import Svg from './svg';

import MyGreatPlace from './my-great-place';

const DEFAULT_REF = 'map';

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pInfos : [],
      transInfos : [],
      bounds: [],
      googleApiLoaded: false
    }

    this.routeInformation = this.routeInformation.bind(this);
    this.findPortInfoArray = this.findPortInfoArray.bind(this);
    this.onGoogleApiLoaded = this.onGoogleApiLoaded.bind(this);
    this.drawSvg =  this.drawSvg.bind(this);
  }

  componentDidMount() {
    this.routeInformation();
  }

  routeInformation() {
    const { route } = this.props;
    const minuszero = _.pullAt(route, [0, 1]);

    const even = [];
    const odd = [];

    for (let i=0; i<route.length; i++){
      if (i%2==0) {
        even.push(route[i]);
      } else {
        odd.push(route[i]);
      }
    }

    this.findPortInfoArray(even);
    this.findTransPortArray(odd);
  }


  findPortInfoArray(array) {
    const { allPorts } = this.props;
    let portsInfo = [];
    _.map(array, _array => {
      const portInfo = _.find(allPorts, {'id': _array });
      portsInfo.push(portInfo);
    });

    this.setState({ pInfos : portsInfo });
  }

  findTransPortArray(array) {
    const { transports } = this.props;
    let transportsInfo = [];
    _.map(array, _array => {
      const transportInfo = _.find(transports, { 'id': _array });
      transportsInfo.push(transportInfo);
    });

    this.setState({ transInfos : transportsInfo });
  }

  onGoogleApiLoaded({map, maps}) {
      this.setState({
          googleApiLoaded: true
      });

      const bounds = new maps.LatLngBounds();

      function extendBounds(lat, lng) {
          const latLng = new maps.LatLng(lat, lng);
          bounds.extend(latLng);
      }
      function extendCoordsBounds(pInfos) {
          for (var i = 0; i < pInfos.length; i++) {
              if (pInfos[i].hasOwnProperty('latitude') && pInfos[i].hasOwnProperty('longitude')) {
                  extendBounds(pInfos[i].latitude, pInfos[i].longitude);
              } else if (Array.isArray(pInfos[i])) {
                  extendCoordsBounds(pInfos[i]);
              }
          }
      }

      extendCoordsBounds(this.state.pInfos);

      map.fitBounds(bounds);
  }


  drawSvg(ref) {
    if (!this.state.googleApiLoaded || this.state.bounds.length == 0)
        return null;
      else
        return (
          <Svg
              lat={this.state.bounds[0]}
              lng={this.state.bounds[1]}
              coordinates={this.state.pInfos}
              bounds={this.state.bounds}
              zoom={5}
              height={this.refs[ref] ? this.refs[ref].offsetHeight : 0}
              width={this.refs[ref] ? this.refs[ref].offsetWidth : 0} />
        );
    }

  render() {
    const { pInfos, transInfos } = this.state;
    const ref = this.props.ref || DEFAULT_REF;

    console.log(pInfos, transInfos);

    return (
      <div className="map">
        <GoogleMap
          ref={ref}
          height="300px"
          zoom={5} center={[24.886, -70.268]}
          onGoogleApiLoaded={this.onGoogleApiLoaded}
          >
          {
            (() => {
              if(_.isEmpty(pInfos)) {
                  return null;
              }
              return (
                _.map(pInfos, (pinfo, index) => (
                  <MyGreatPlace
                    key={index}
                    lat={pinfo.latitude}
                    lng={pinfo.longitude}
                    text={index}
                  />
                ))
              );
            })()
          }
          {this.drawSvg(ref)}
        </GoogleMap>
      </div>
    );
  }
}
