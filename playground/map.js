var map;
function initialize() {
  var mapOptions = {
    zoom: 2,
    center: new google.maps.LatLng(24.397, -10.644),
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);


var path = 'ws://54.191.102.104';
  //console.log('ws path', path);
  var ws = new WebSocket(path);

  ws.onmessage = function(evt){
    try{
      var data = JSON.parse(evt.data);
      console.log('evt', data);

      if(data.geo){
        var marker = new google.maps.Marker({
         position: new google.maps.LatLng(data.geo.ll[0],data.geo.ll[1]),
         title:data.type || 'skynet'
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);
        setTimeout(function(){
          marker.setMap(null);
        }, 3000);
      }
    }
    catch(ex){
      console.log('erro on data', ex);
    }

  };


}

google.maps.event.addDomListener(window, 'load', initialize);
