// code adapted from netbrains from stack overflow answered Oct 28 '13 at 17:07
function initMap() {
  var map = new google.maps.Map($('#map')[0],{
      zoom: 4,
      center: new google.maps.LatLng(39.828291, -97.676636)
  });

  var markers = [];
  var location =[];
  var infowindow = new google.maps.InfoWindow();
  for (var x = 0,count = 0; x < cities.length; x++,count++) {
      $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+cities[x]+'&sensor=false', null, function (data) {
          var p = data.results[0].geometry.location
          var latlng = new google.maps.LatLng(p.lat, p.lng);
          location.push(latlng);
          var marker= new google.maps.Marker({
                      position: latlng,
                      map: map,
                      animation: google.maps.Animation.DROP,
                      id:cities[x]
                      });
          marker.setMap(map);
          var id = marker.id;
          markers.push(id);

          // add info windows to each of the markers
          google.maps.event.addListener(marker, 'click', (function (marker, x) {
          return function (){
              infowindow.setContent('Student Contacts: ' + id);
              infowindow.open(map, marker);
          }
        })(marker, x));
      });
  }
  console.log(markers);
}
