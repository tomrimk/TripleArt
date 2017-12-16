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

  // 54.6814874, 25.2805559
  var gediminoPilis = { lat: 54.6815164, lng: 25.280769799999998 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: gediminoPilis,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
    }
  });

  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

  map.addListener('click', function(e) {
    console.log(e.latLng.lat() + ' ' + e.latLng.lng());
    checkIn(e.latLng.lat(), e.latLng.lng());
  });

  var contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h3 id="firstHeading" class="firstHeading">Gedimino pilies bokštas</h3>' +
    '<div id="bodyContent">' +
    '<p><b>Esami elementai:</b></br>' +
    '<div class="element">' +
    '<img style="width: 30px; height: 30px;" src="images/oras.png"></img>' +
    '<p>7</p>' +
    '</div>' +
    '<div class="element">' +
    '<img style="width: 30px; height: 30px;" src="images/žemė.png"></img>' +
    '<p>2</p>' +
    '</div>' +
    '<div class="element">' +
    '<img style="width: 30px; height: 30px;" src="images/vanduo.png"></img>' +
    '<p>3</p>' +
    '</div>' +
    '<div class="element">' +
    '<img style="width: 30px; height: 30px;" src="images/ugnis.png"></img>' +
    '<p>1</p>' +
    '</div>' +
    '<p><a target="_blank" href="https://pamatyklietuvoje.lt/details/gedimino-pilies-bokstas/1480">Sužinoti daugiau</a></p>' +
    '<button onclick="checkIn()">Atsiimti elementus</button>';
  '</div>' + '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString,
    pixelOffset: new google.maps.Size(-12, 0)
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
    map: map,
    icon: image
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
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
    var objectLatitude = 54.6814874;
    var objectLongitude = 25.2805559;

    var distance = measure(
      lattitude,
      longitude,
      objectLatitude,
      objectLongitude
    );

    if (distance >= 100) {
      status.innerHTML = 'Jūs nesate arti objekto';
    } else {
      status.innerHTML =
        'Sveikiname! Jūs įgyjote 3 ugnies ir 4 vandens elementus!';
    }

    console.log(distance);
  }

  function error() {
    console.log('Kažkas netaip');
  }

  navigator.geolocation.getCurrentPosition(success, error);
}
