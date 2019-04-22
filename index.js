var map;

var data=
{
  "restaurant":[
     {
        "name":"台南成大店",
        "lng":120.2224226,
        "lat":23.0028077,
        "waitTime":10
     },
     {
        "name":"台南成大店",
        "lng":120,
        "lat":23,
        "waitTime":10
     }
  ]
}


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:data.restaurant[0].lat, lng:data.restaurant[0].lng},
    zoom: 15
  });
}

var app = new Vue({
  el: '#app',
  data: {
    name:data.restaurant[0].name,
    waitTime:data.restaurant[0].waitTime
  }
})
