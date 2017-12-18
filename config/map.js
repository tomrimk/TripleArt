module.exports = initMap = obj => {
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

    marker.addListener('click', function() {
      infowindow.open(myMap, marker);
    });
  }
};
