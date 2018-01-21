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
  return Math.round(d * 1000);
}

function checkIn(myLat, myLong) {
  function success(pos) {
    var asmensLattitude = pos.coords.latitude;
    var asmensLongitude = pos.coords.longitude;

    var objectLatitude = myLat;
    var objectLongitude = myLong;

    var distance = measure(
      asmensLattitude,
      asmensLongitude,
      objectLatitude,
      objectLongitude
    );

    if (distance >= 100) {
      return false;
    } else {
      return true;
    }
  }

  function error() {
    console.log('Kažkas netaip');
  }

  navigator.geolocation.getCurrentPosition(success, error);
}