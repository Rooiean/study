import _ from 'lodash';
import React, { Component } from 'react';
import store from 'store';
import GoogleMap, { fitBounds } from 'google-map-react';

const DEFAULT_REF = 'map';

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bounds: [],
      airportInfos: [],
      googleApiLoaded: false
    }

    this.createMapOptions = this.createMapOptions.bind(this);
    this.onGoogleApiLoaded = this.onGoogleApiLoaded.bind(this);
    this.findAirportArray = this.findAirportArray.bind(this);
  }

  componentDidMount() {
    this.findAirportArray();
  }

  createMapOptions(maps) {
    return {
      zoomControlOptions: {
        position: maps.ControlPosition.RIGHT_CENTER,
        style: maps.ZoomControlStyle.SMALL
      },
      mapTypeControlOptions: {
        position: maps.ControlPosition.TOP_RIGHT
      },
      mapTypeControl: true
    };
  }

  findAirportArray() {
    const { allPorts } = store.getState().search;
    const { airport } = store.getState().air;
    const { schedule } = this.props;
    let airports = [];
    const srcPort = _.find(airport, { 'name': schedule.srcPortName });
    const dstPort = _.find(airport, { 'name': schedule.dstPortName });
    const srcPort2 = _.find(allPorts, { 'locationCode': srcPort.code });
    const dstPort2 = _.find(allPorts, { 'locationCode': dstPort.code });
    airports.push(srcPort2, dstPort2);


    this.setState({ airportInfos : airports });
  }


  onGoogleApiLoaded({map, maps}) {
      this.setState({
          googleApiLoaded: true
      });

      const { airportInfos } = this.state;

      const bounds = new maps.LatLngBounds();

      function extendBounds(lat, lng) {
          const latLng = new maps.LatLng(lat, lng);
          bounds.extend(latLng);
      }

      function extendCoordsBounds(airportInfos) {
        var infowindow = new google.maps.InfoWindow();

        var marker, i;

          for (i = 0; i < airportInfos.length; i++) {
              if (airportInfos[i].hasOwnProperty('latitude') && airportInfos[i].hasOwnProperty('longitude')) {
                  extendBounds(airportInfos[i].latitude, airportInfos[i].longitude);
                  var marker = new google.maps.Marker({
                    position: {lat: airportInfos[i].latitude, lng: airportInfos[i].longitude},
                    map: map,
                    title: airportInfos[i].name,
                  });
                  google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
                    return function() {
                      infowindow.setContent(airportInfos[i].name + '/' + airportInfos[i].countryCode);
                      infowindow.open(map, marker);
                    }
                  })(marker, i));
                  google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
                    return function() {
                      infowindow.close(map, marker);
                    }
                  })(marker, i));


              } else if (Array.isArray(airportInfos[i])) {
                  extendCoordsBounds(airportInfos[i]);
              }
          }
      }


      extendCoordsBounds(this.state.airportInfos);

      function makePolyline(infosArray) {
        for (let j = 0; j < infosArray.length; j++) {

          let newInfos = [];
          newInfos.push(_.nth(infosArray, 0), _.nth(infosArray, 1));

          let newInfofirst = _.nth(newInfos, 0);

          if(_.isEqual(newInfofirst.type, 'AIRPORT')) {
            let latlngForFlightPoly = _.map(newInfos, info => {
              return { lat: info.latitude, lng: info.longitude };
            });
            var flightPath = new google.maps.Polyline({
               path: latlngForFlightPoly,
               geodesic: true,
               strokeColor: '#FF0000',
               strokeOpacity: 1.0,
               strokeWeight: 2
             });
             flightPath.setMap(map);
          } else {
            return null;
          }
        }
      }

      makePolyline(this.state.airportInfos);
      map.fitBounds(bounds);
  }


  render() {
    const ref = this.props.ref || DEFAULT_REF;
    return (
      <div className="map">
        <GoogleMap
          ref={ref}
          height="600px"
          options={this.createMapOptions}
          zoom={5} center={[0, 0]}
          onGoogleApiLoaded={this.onGoogleApiLoaded}
          yesIWantToUseGoogleMapApiInternals={true}
        />
      </div>
    );
  }
}
