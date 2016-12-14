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
    const { airport } = store.getState().air;
    const { schedule } = this.props;
    let airports = [];
    const srcPort = _.find(airport, { 'name': schedule.srcPortName });
    const dstPort = _.find(airport, { 'name': schedule.dstPortName });
    airports.push(srcPort, dstPort);


    this.setState({ airportInfos : airports });
  }


  onGoogleApiLoaded({map, maps}) {
    this.setState({
        googleApiLoaded: true
    });

    const { airportInfos } = this.state;

    console.log(airportInfos)
    var addresses = [airportInfos[0].code, airportInfos[1].code];
		var geocoder = new google.maps.Geocoder;
		var locations = new Array();

		for (var i = 0; i < addresses.length; i++) {
				geocoder.geocode({'address': addresses[i]}, function(results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
					var location = results[0].geometry.location;
					var marker = new google.maps.Marker({
						map: map,
						position: location
					});
					locations.push(location);

					var first = locations[0];
					var second = locations[1];

					if(!(second === undefined)) {
						var bounds = new google.maps.LatLngBounds(first, second);
						map.fitBounds(bounds);

						var geodesicPoly = new google.maps.Polyline({
							strokeColor: '#CC0099',
							strokeOpacity: 1.0,
							strokeWeight: 3,
							geodesic: true,
							map: map
						});
						var path = [first, second];
						geodesicPoly.setPath(path);
					}
				} else {
						location = "unknown";
				}
			});
		};
  }


  render() {
    const ref = this.props.ref || DEFAULT_REF;
    return (
      <div className="map">
        <GoogleMap
          ref={ref}
          height="500px"
          options={this.createMapOptions}
          zoom={5} center={[0, 0]}
          onGoogleApiLoaded={this.onGoogleApiLoaded}
          yesIWantToUseGoogleMapApiInternals={true}
        />
      </div>
    );
  }
}
