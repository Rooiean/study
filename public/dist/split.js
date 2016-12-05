var map;
var routePoints=new Array(0);
var routeMarkers=new Array(0);
var routePath;
var temp = new Array();
var markers=[];
var lines=[];
var polygonPoints=[];
var polygon=null;
var lineColor="#ff0000";
var lineWidth=1;

var mode=0;
var splitpoint1;
var splitpoint2;
var listner;

function initialize()
{
	document.getElementById('messagediv').innerHTML='Loading ...';
	var latlng = new google.maps.LatLng(0,0);
	var myOptions = {zoom:2,center:latlng,mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.DROPDOWN_MENU},draggableCursor:'crosshair'};
	map = new google.maps.Map(document.getElementById('map_canvas'),myOptions);
	listner=google.maps.event.addListener(map, 'click', clickmap);
	document.getElementById('messagediv').innerHTML='Ready';
}

function clickmap(event)
{
	if (mode==0)
	{
		routePoints.push(event.latLng);
		document.getElementById('messagediv').innerHTML="Adding Point ("+(routePoints.length)+")...";
		CheckPointsForSplit(routePoints.length);
		var marker=placeMarker(event.latLng,routePoints.length);
		routeMarkers.push(marker);

		//remove old polyline first
		if (!(routePath==undefined))
		{
			routePath.setMap(null);
		}
		routePath=getRoutePath();
		routePath.setMap(map);

		CheckPointsForSplit(routePoints.length);
	}
}

function placeMarker(location,number)
{
	var marker = new google.maps.Marker({position:location,map:map,icon:iconFile,title:number.toString(),draggable:true});

	google.maps.event.addListener(marker, 'dragend', function(event)
	{
		routePoints[number-1]=event.latLng;
		//remove polyline
		routePath.setMap(null);
		//add new polyline
		routePath=getRoutePath();
		routePath.setMap(map);
	});

	google.maps.event.addListener(marker, 'click', function(event)
	{
		if (mode==2)
		{
			document.getElementById('messagediv').innerHTML="Splitting";
			splitpoint2=event.latLng;
			SplitRoute(splitpoint1,splitpoint2);
			mode=0;

		}
		if (mode==1)
		{
			document.getElementById('messagediv').innerHTML="Click on the second marker";
			mode=2;
			splitpoint1=event.latLng;
		}
	});

	return marker;
}

function getRoutePath()
{
	var routePath = new google.maps.Polyline({
		path: routePoints,
		strokeColor: lineColor,
		strokeOpacity: 1.0,
		strokeWeight: lineWidth,
		geodesic: true
	});
	return routePath;
}

if (!('toRadians' in Number.prototype)) {
  Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
  };
}

 function getangularDistance(point1, point2) {
  var phi1 = point1.lat().toRadians();
  var phi2 = point2.lat().toRadians();

  var d_phi = (point2.lat() - point1.lat()).toRadians();
  var d_lmd = (point2.lng() - point1.lng()).toRadians();

  var A = Math.pow(Math.sin(d_phi / 2), 2) +
          Math.cos(phi1) * Math.cos(phi2) *
            Math.pow(Math.sin(d_lmd / 2), 2);

  return 2 * Math.atan2(Math.sqrt(A), Math.sqrt(1 - A));
};

function findmidpoint(point1, point2, fraction)
 {


  if (point1.equals(point2)) {
    return new geo.Point(point1);
  }

  var phi1 = point1.lat().toRadians();
  var phi2 = point2.lat().toRadians();
  var lmd1 = point1.lng().toRadians();
  var lmd2 = point2.lng().toRadians();

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

  return  new google.maps.LatLng(
      Math.atan2(z, Math.sqrt(Math.pow(x, 2) +
                              Math.pow(y, 2))).toDegrees(),
      Math.atan2(y, x).toDegrees());
};

 Number.prototype.toDegrees = function() {
    return this * 180 / Math.PI;
  };

function SplitRoute(pnt1,pnt2)
{
	var midpoint=findmidpoint(pnt1,pnt2,0.5);
	var midpoint = new google.maps.LatLng(midpoint.lat(),midpoint.lng());
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

	routePoints=tmppoints;
	redisply();
	document.getElementById('messagediv').innerHTML="Split Complete";
}

function redisply()
{
	if (routeMarkers)
	{
		for (i in routeMarkers)
		{
			routeMarkers[i].setMap(null);
		}
	}
	routeMarkers=new Array(0);
	//remove polyline
	if (!(routePath==undefined))
	{
		routePath.setMap(null);
	}

	routePath=getRoutePath();
	routePath.setMap(map);

	if (routePoints)
	{
		var count=1;
		for (i in routePoints)
		{
			var marker=placeMarker(routePoints[i],count);
			routeMarkers.push(marker);
			count++;
		}
	}
}

function getlowestbetween(i1,i2)
{
	if (i1>i2)
	{
		return (i2);
	}
	else
	{
		return (i1);
	}
}

function getindexofpoint(point)
{
	var index;
	for(var i=0;i<routePoints.length;++i)
	{
		if ((routePoints[i].lat()==point.lat())&&(routePoints[i].lng()==point.lng()))
		{
			index=i;
		}
	}
	return (index);
}


function CheckPointsForSplit(nopoints)
{
	if (nopoints>1)
	{
		document.getElementById("btn_split").disabled=false;
	}
	else
	{
		document.getElementById("btn_split").disabled=true;
	}
}

function MakeSplit()
{
	document.getElementById('messagediv').innerHTML="Click on the first marker";
	mode=1;
}

function ClearMap()
{
	if (routeMarkers)
	{
		for (i in routeMarkers)
		{
			routeMarkers[i].setMap(null);
		}
	}

	//remove polyline
	if (!(routePath==undefined))
	{
		routePath.setMap(null);
	}

	routePath=null;
	routePoints=new Array(0);
	routeMarkers=new Array(0);

	CheckPointsForSplit(routePoints.length);
	mode=0;
	document.getElementById('messagediv').innerHTML="Map Cleared";
}
