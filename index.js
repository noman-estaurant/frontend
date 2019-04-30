var map;
var storeid;
var data=
{
  "restaurant":[
     {
        "name":"台南成大店",
        "lng":120.2224226,
        "lat":23.0028077,
        "waitTime":10,
        "adress":"台南市大學路1號",
        "distance":150,
        "phonenumber":"06-2757575"
     },
     {
        "name":"台南成大店",
        "lng":120,
        "lat":23,
        "waitTime":10,
        "adress":"台南市東區大學路1號",
        "distance":150,
        "phonenumber":"06-2757575"
     }
  ]
}
var BackendData;
restaurantid=0;

function get_userPosition(){
  navigator.geolocation.getCurrentPosition(function(position){
    $.ajax({
      url:"http://luffy.ee.ncku.edu.tw:17785/api/restaurant",
      method:"POST",
      data:{"userPosition_lat":position.coords.latitude,"userPosition_lng":position.coords.longitude},
      dataType:"json",
      success:function(response){BackendData=response},
      error:function(){console.log("Error...")}
    })
  })
};


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:data.restaurant[restaurantid].lat, lng:data.restaurant[restaurantid].lng},
    zoom: 15,
    fullscreenControl:false
  });
  var Data = [
    {
      position : { lat:data.restaurant[restaurantid].lat, lng:data.restaurant[restaurantid].lng},
      map:map,
      title:data.restaurant[restaurantid].name,
      icon:'https://i.imgur.com/41yD3gh.png'
  }]
  var marker = new google.maps.Marker(Data[0]);
};

var app = new Vue({
  el: '#app',
  data: {
    name:data.restaurant[restaurantid].name,
    waitTime:data.restaurant[restaurantid].waitTime,
    distance:data.restaurant[restaurantid].distance,
    adress:data.restaurant[restaurantid].adress,
    phonenumber:data.restaurant[restaurantid].phonenumber
  }
})
