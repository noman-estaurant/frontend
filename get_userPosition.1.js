//Backend
function get_userPosition() {
  navigator.geolocation.getCurrentPosition(function (position) {
    userPosition_lat = position.coords.latitude;
    userPosition_lng = position.coords.longitude;
    $.ajax({
      url: "http://luffy.ee.ncku.edu.tw:17785/api/restaurant",
      method: "POST",
      data: { "userPosition_lat": position.coords.latitude, "userPosition_lng": position.coords.longitude },
      dataType: "json",
      success: function (response) { BackendData = response; },
      error: function () { console.log("Error..."); }
    });
  });
}
