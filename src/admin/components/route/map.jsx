import React, { Component } from 'react';
import GoogleMap, { fitBounds } from 'google-map-react';

const DEFAULT_REF = 'map';

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pInfos: [],
      transInfos: [],
      bounds: [],
      googleApiLoaded: false
    }

    this.routeInformation = this.routeInformation.bind(this);
    this.findPortInfoArray = this.findPortInfoArray.bind(this);
    this.onGoogleApiLoaded = this.onGoogleApiLoaded.bind(this);
  }

  componentDidMount() {
    this.routeInformation();
  }

  routeInformation() {
    const { route } = this.props;
    const reRoute = _.concat(route);
    const minuszero = _.pullAt(reRoute, [0, 1]);

    const even = [];
    const odd = [];

    for (let i=0; i<reRoute.length; i++){
      if (i%2==0) {
        even.push(reRoute[i]);
      } else {
        odd.push(reRoute[i]);
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
        var infowindow = new google.maps.InfoWindow();

        var marker, i;

          for (i = 0; i < pInfos.length; i++) {
              if (pInfos[i].hasOwnProperty('latitude') && pInfos[i].hasOwnProperty('longitude')) {
                  extendBounds(pInfos[i].latitude, pInfos[i].longitude);
                  var marker = new google.maps.Marker({
                    position: {lat: pInfos[i].latitude, lng: pInfos[i].longitude},
                    map: map,
                    title: pInfos[i].name,
                  });
                  google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
                    return function() {
                      infowindow.setContent(pInfos[i].name + '/' + pInfos[i].countryCode);
                      infowindow.open(map, marker);
                    }
                  })(marker, i));
                  google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
                    return function() {
                      infowindow.close(map, marker);
                    }
                  })(marker, i));


              } else if (Array.isArray(pInfos[i])) {
                  extendCoordsBounds(pInfos[i]);
              }
          }
      }

      extendCoordsBounds(this.state.pInfos);

      function makePolyline(infosArray) {
        console.log(infosArray);
        for (let j = 0; j < infosArray.length; j++) {

          let newInfos = [];
          newInfos.push(_.nth(infosArray, 0), _.nth(infosArray, 1));

          let newInfofirst = _.nth(newInfos, 0);
          console.log(newInfos, newInfofirst);

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
            let latlngForSeaPoly = _.map(newInfos, info => {
              return { lat: info.latitude, lng: info.longitude };
            });
            var vesselPath = new google.maps.Polyline({
               path: latlngForSeaPoly,
               geodesic: false,
               strokeColor: '#FF0000',
               strokeOpacity: 1.0,
               strokeWeight: 2
             });

            vesselPath.setMap(map);
          }

          _.drop(infosArray);

        }
      }


      function SplitRoute(pnt1, pnt2) {

        var midpoint = geo.math.midpoint(pnt1, pnt2);
        var midpoint = new google.maps.LatLng(midpoint.lat(), midpoint.lng());
        var tmppoints = [];
        var insertpoint = getlowestbetween(getindexofpoint(pnt1), getindexofpoint(pnt2));
        for (var i = 0; i < routePoints.length; ++i) {
            tmppoints.push(routePoints[i]);
            if (i == insertpoint) {
                tmppoints.push(midpoint);
            }
        }
        routePoints = tmppoints;
        redisply();
        messagediv.innerHTML = "Split Complete";

      }


      makePolyline(this.state.pInfos);
      map.fitBounds(bounds);
      var elevator = new google.maps.ElevationService;
  }


  render() {
    const { pInfos, transInfos } = this.state;
    const ref = this.props.ref || DEFAULT_REF;

    return (
      <div className="map">
        <GoogleMap
          ref={ref}
          height="300px"
          zoom={5} center={[24.886, -70.268]}
          onGoogleApiLoaded={this.onGoogleApiLoaded}
          yesIWantToUseGoogleMapApiInternals={true}
        />
      </div>
    );
  }
}
