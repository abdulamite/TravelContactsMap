// code adapted from netbrains from stack overflow answered Oct 28 '13 at 17:07
function initMap() {
  var map = new google.maps.Map($('#map')[0],{
      zoom: 5,
      center: new google.maps.LatLng(39.828291, -97.676636)
  });

  var cities = ['Arcata, CA', 'Denver, Co', 'Detroit, MI','Montebello, CA','Germany','Denver, CO'];
  var markers = [];

  for (var x = 0; x < cities.length; x++) {
      $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+cities[x]+'&sensor=false', null, function (data) {
          var p = data.results[0].geometry.location
          var latlng = new google.maps.LatLng(p.lat, p.lng);
          var marker= new google.maps.Marker({
                      position: latlng,
                      map: map
                      });
          marker.setMap(map);
          markers.addMarker(marker);
      });
  }
}
