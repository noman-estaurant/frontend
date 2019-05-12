var map;
var diretion;
var app;
var dir_app;
var Data;
var restaurantid=0;
//Backend
function get_userPosition(){
  navigator.geolocation.getCurrentPosition(function(position){
    userPosition_lat=position.coords.latitude;
    userPosition_lng=position.coords.longitude;
    $.ajax({
      url:"http://luffy.ee.ncku.edu.tw:17785/api/restaurant",
      method:"POST",
      data:{"userPosition_lat":position.coords.latitude,"userPosition_lng":position.coords.longitude},
      dataType:"json",
      success:function(response){Data=response},
      error:function(){console.log("Error...")}
    })
  })
};
setTimeout(()=>{
  console.log(Data.restaurant[0])
  app = new Vue({
    el: '#app',
    data: {
      Data,
      distance:150
    },
    mounted:function(){
      restaurantid=restaurantid+1;
      $('.fork').click(function(){
        $(this).replaceWith(`<img class="fork" src="./pic/fork_click.png" alt=""></img>`)
        /*接入點餐介面*/
      });
      $('.clip_map').click(function(){
        if(this.id=="No.1"){
          restaurantid=0;
          initDirection();
        }
        else if(this.id=="No.2"){
          restaurantid=1;
          initDirection();
        }
        $('.namecard').hide("slow",function(){
          document.getElementById("app").style.display="none"
          document.getElementById("foo").style.display="none"
          $('#direction').show();
          $('#dir_app').show();
        });
      });
    }
  })
  dir_app = new Vue({
    el:'#dir_app',
    data:{
      name:Data.restaurant[restaurantid].name,
      waitTime:Data.restaurant[restaurantid].waitTime,
      distance:Data.restaurant[restaurantid].distance,
      adress:Data.restaurant[restaurantid].adress,
      phonenumber:Data.restaurant[restaurantid].phonenumber
    }
  })
},3000)
//Google Map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:data.restaurant[restaurantid].lat, lng:data.restaurant[restaurantid].lng},
    zoom: 15,
    fullscreenControl:false,
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
//Diretion
function initDirection(){
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  direction=new google.maps.Map(document.getElementById('direction'),{
    center: {lat:userPosition_lat,lng:userPosition_lng},
    zoom: 15,
    mapTypeControl:false,
    zoomControl:false,
    streetViewControl:false,
    fullscreenControl:false
  });
  directionsDisplay.setMap(direction);
  var request={
    origin:{lat:userPosition_lat,lng:userPosition_lng},
    destination:{lat:Data.restaurant[restaurantid].lat, lng:Data.restaurant[restaurantid].lng},
    travelMode: 'DRIVING'
  }
  directionsService.route(request,function(result,status){
    if(status=='OK'){
      console.log(result.routes[0].legs[0].steps);
      directionsDisplay.setDirections(result);
    }
    else{
      console.log(status);
    }
  })
};
//Vue JS
$( document ).ready(function() {
  get_userPosition();
  console.log( "ready!" );
});
function AboutMap(){
  initDirection();
}
//FrontEnd
//這裡要進點餐喔

$('.dir_card').swipe({
  threshold:10,
  swipe:function(event, direction, distance, duration, fingerCount, fingerData, currentDirection){
    if (direction=="down"){
      $(this).animate({
        opacity:0.5,
        bottom:"-100px",
      },function(){$(this).hide()})
    }
  }
});
$('.pngfork').click(/*接入點餐介面*/)