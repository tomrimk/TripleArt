function initMap() {
  var styledMapType = new google.maps.StyledMapType(
    [
      {
        featureType: 'poi',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      }
    ],
    { name: 'Styled Map' }
  );

  var markers = [];

  // 54.6814874, 25.2805559
  var gediminoPilis = { lat: 54.686757, lng: 25.29069 };
  window.myMap = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: gediminoPilis,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
    }
  });

  myMap.mapTypes.set('styled_map', styledMapType);
  myMap.setMapTypeId('styled_map');

  myMap.addListener('click', function(e) {
    deleteMarkers();
    console.log(e.latLng.lat() + ' ' + e.latLng.lng());
    var marker = new google.maps.Marker({
      position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
      map: myMap
    });

    markers.push(marker);
    checkIn(e.latLng.lat(), e.latLng.lng());
  });

  var image = {
    url: 'images/marker.png',
    size: new google.maps.Size(50, 50),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0),
    scaledSize: new google.maps.Size(25, 25)
  };

  var marker = new google.maps.Marker({
    position: gediminoPilis,
    map: myMap,
    icon: image
  });

  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

  function clearMarkers() {
    setMapOnAll(null);
  }
  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }
}

function measure(lat1, lon1, lat2, lon2) {
  var R = 6378.137; // Radius of earth in KM
  var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
  var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return Math.round(d * 1000); // meters
}

function checkIn(myLat, myLong) {
  var status = document.getElementById('statusMessage');

  function success(pos) {
    // var currentLatitude = pos.coords.latitude;
    // var currentLongitude = pos.coords.longitude;

    var lattitude = myLat;
    var longitude = myLong;

    //Gedimino pilies koordinatės
    // 54.6814874, 25.2805559
    var objectLatitude = 54.686757;
    var objectLongitude = 25.29069;

    var distance = measure(
      lattitude,
      longitude,
      objectLatitude,
      objectLongitude
    );

    if (distance >= 100) {
      status.innerHTML = 'Jūs nesate arti objekto';
    } else {
      status.innerHTML = 'Sveikiname! Jūs įgijote 5 taškus!';
    }
    console.log(distance);
  }

  function error() {
    console.log('Kažkas netaip');
  }

  navigator.geolocation.getCurrentPosition(success, error);
}
