import _ from 'lodash';
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
    this.createMapOptions = this.createMapOptions.bind(this);
  }

  componentDidMount() {
    this.routeInformation();
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


      var routePath;
      var routePoints=new Array(0);

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
            SplitRoute(latlngForSeaPoly[0], latlngForSeaPoly[1]);
            routePoints.push(latlngForSeaPoly[0], latlngForSeaPoly[1]);
          }

          _.drop(infosArray);

        }
      }

      function SplitRoute(pnt1, pnt2) {
        var midpoint = findmidpoint(pnt1,pnt2,0.5);
      	var midpoint = new google.maps.LatLng(midpoint.lat(),midpoint.lng());

        var elevator = new google.maps.ElevationService;

        elevator.getElevationForLocations({
          'locations': [midpoint]
        }, function(results, status) {
          if (status === google.maps.ElevationStatus.OK) {
            if(results[0].elevation > 0) {
              findClosestMidpoint(midpoint, 24, 9);
            }
            console.log(results[0].elevation, status);
          } else {
            console.log(status);
          }
        });

        var tmppoints=[];
      	var insertpoint=getlowestbetween(getindexofpoint(pnt1),getindexofpoint(pnt2));

      	for(var i=0;i<routePoints.length;++i)
      	{
      		tmppoints.push(routePoints[i]);
      		if (i==insertpoint)
      		{
      			tmppoints.push(midpoint);
      		}
      	}

      	routePoints = tmppoints;
      	routePath = getRoutePath();
        routePath.setMap(map);
      }


      debugger;

      function findClosestMidpoint(midpoint) {
        console.log(midpoint);
        var radius = 200000;//하나가 200km
        var curPos = midpoint;

        var cityCircle = new google.maps.Circle({
           strokeColor: '#FF0000',
           strokeOpacity: 0.8,
           strokeWeight: 2,
           fillColor: '#FF0000',
           fillOpacity: 0.35,
           map: map,
           center: midpoint,
           radius: radius
       });

       routePath.setMap(map);

      }

      debugger;

      function getlowestbetween(i1,i2) {
          if(i1 > i2) {
              return (i2);
          } else {
              return (i1);
          }
      }

      function getindexofpoint(point) {
        var index;
        for (var i = 0; i < routePoints.length; ++i) {
            if ((routePoints[i].lat == point.lat) && (routePoints[i].lng == point.lng)) {
                index = i;
            }
        }
        return (index);
      }

      function getRoutePath() {
      	var routePath = new google.maps.Polyline({
      		path: routePoints,
          geodesic: false,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
      	});
      	return routePath;
      }

      Number.prototype.toDegrees = function() {
        return this * 180 / Math.PI;
      };

     if (!('toRadians' in Number.prototype)) {
       Number.prototype.toRadians = function() {
         return this * Math.PI / 180;
       };
     }

      function findmidpoint(point1, point2, fraction) {
        var phi1 = point1.lat.toRadians();
        var phi2 = point2.lat.toRadians();
        var lmd1 = point1.lng.toRadians();
        var lmd2 = point2.lng.toRadians();

        var cos_phi1 = Math.cos(phi1);
        var cos_phi2 = Math.cos(phi2);

        var angularDistance = getangularDistance(point1, point2);
        var sin_angularDistance = Math.sin(angularDistance);

        var A = Math.sin((1 - fraction) * angularDistance) / sin_angularDistance;
        var B = Math.sin(fraction * angularDistance) / sin_angularDistance;

        var x = A * cos_phi1 * Math.cos(lmd1) +
                B * cos_phi2 * Math.cos(lmd2);

        var y = A * cos_phi1 * Math.sin(lmd1) +
                B * cos_phi2 * Math.sin(lmd2);

        var z = A * Math.sin(phi1) +
                B * Math.sin(phi2);

        return new google.maps.LatLng(
            Math.atan2(z, Math.sqrt(Math.pow(x, 2) +
                                    Math.pow(y, 2))).toDegrees(),
            Math.atan2(y, x).toDegrees());
      };

      function getangularDistance(point1, point2) {
       var phi1 = point1.lat.toRadians();
       var phi2 = point2.lat.toRadians();

       var d_phi = (point2.lat - point1.lat).toRadians();
       var d_lmd = (point2.lng - point1.lng).toRadians();

       var A = Math.pow(Math.sin(d_phi / 2), 2) +
               Math.cos(phi1) * Math.cos(phi2) *
                 Math.pow(Math.sin(d_lmd / 2), 2);

       return 2 * Math.atan2(Math.sqrt(A), Math.sqrt(1 - A));
     };

      makePolyline(this.state.pInfos);
      map.fitBounds(bounds);


  }


  render() {
    const { pInfos, transInfos } = this.state;
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
