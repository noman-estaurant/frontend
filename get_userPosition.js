function get_userPosition() {
  navigator.geolocation.getCurrentPosition(function (position) {
    userPosition_lat = position.coords.latitude;
    userPosition_lng = position.coords.longitude;
  });
}
