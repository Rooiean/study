import _ from 'lodash';
import React, { Component } from 'react';
import GoogleMap, { fitBounds } from 'google-map-react';

const DEFAULT_REF = 'map';

export default class MapThird extends Component {
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

      const bounds = new google.maps.LatLngBounds();

      function extendBounds(lat, lng) {
          const latLng = new google.maps.LatLng(lat, lng);
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

      var points = new Array();
      var tempPoints = new Array();
      var polyline;

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
            let latlngForSeaPoly = _.map(newInfos, info => {
              return { lat: info.latitude, lng: info.longitude };
            });
            points.push(latlngForSeaPoly[0], latlngForSeaPoly[1]);
            tempPoints.push(latlngForSeaPoly[0], latlngForSeaPoly[1]);
            polyline = new google.maps.Polyline({
               path: tempPoints,
               geodesic: false,
               strokeColor: '#FF0000',
               strokeOpacity: 1.0,
               strokeWeight: 2
             });
             polyline.setMap(map);

             var nextMarkerAt = 0;     // Counter for the marker checkpoints.
             var nextPoint = null;     // The point where to place the next marker.

             // Draw the checkpoint markers every 1000 meters.

             while (true) {
                // Call moveAlongPath which will return the GLatLng with the next
                // marker on the path.
                nextPoint = moveAlongPath(points, nextMarkerAt);


                if (nextPoint) {
                   // Draw the marker on the map.
                   console.log(nextPoint);
                   var marker = new google.maps.Marker({
                     position: nextPoint,
                     map: map
                   });

                   // Add +500km for the next checkpoint.
                   nextMarkerAt += 500000;
                }
                else {
                   // moveAlongPath returned null, so there are no more check points.
                   break;
                }
             }


          }

          _.drop(infosArray);

        }
      }

      if (!('toRadians' in Number.prototype)) {
        Number.prototype.toRadians = function() {
          return this * Math.PI / 180;
        }
      }

      if (!('toDegrees' in Number.prototype)) {
        Number.prototype.toDegrees = function() {
          return this * 180 / Math.PI;
        }
      }

      function moveTowards(somePoint, point, distance) {
        var lat1 = somePoint.lat.toRadians();
        var lon1 = somePoint.lng.toRadians();
        var lat2 = point.lat.toRadians();
        var lon2 = point.lng.toRadians();
        var dLon = (point.lng - somePoint.lng).toRadians();

        // Find the bearing from this point to the next.
        var brng = Math.atan2(Math.sin(dLon) * Math.cos(lat2),
                              Math.cos(lat1) * Math.sin(lat2) -
                              Math.sin(lat1) * Math.cos(lat2) *
                              Math.cos(dLon));

        var angDist = distance / 6378100;  // Earth's radius.

        // Calculate the destination point, given the source and bearing.
        lat2 = Math.asin(Math.sin(lat1) * Math.cos(angDist) +
                         Math.cos(lat1) * Math.sin(angDist) *
                         Math.cos(brng));

        lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(angDist) *
                                 Math.cos(lat1),
                                 Math.cos(angDist) - Math.sin(lat1) *
                                 Math.sin(lat2));

        if (isNaN(lat2) || isNaN(lon2)) return null;

        var glatlng = {lat:lat2.toDegrees(), lng:lon2.toDegrees()};

        return glatlng;
     }

     function moveAlongPath(points, distance, index) {
        index = index || 0;  // Set index to 0 by default.

        if (index < points.length) {
           // There is still at least one point further from this point.

           var pointFirst = new google.maps.LatLng(_.head(tempPoints).lat, _.head(tempPoints).lng);
           var pointLast = new google.maps.LatLng(_.last(tempPoints).lat, _.last(tempPoints).lng);

           // Get the distance from this point to the next point in the polyline.
           var distanceToNextPoint = google.maps.geometry.spherical.computeDistanceBetween(pointFirst, pointLast);

           if (distance <= distanceToNextPoint) {
              // distanceToNextPoint is within this point and the next.
              // Return the destination point with moveTowards().
              console.log(distance, distanceToNextPoint);
              points[index] = moveTowards(points[index], points[index + 1], distance);
              return points[index];
              index = index+1;
           }
           else {
              // The destination is further from the next point. Subtract
              // distanceToNextPoint from distance and continue recursively.
              return null;
           }
        }
        else {
           // There are no further points. The distance exceeds the length
           // of the full path. Return null.
           return null;
        }
     }




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
