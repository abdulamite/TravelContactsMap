// This is the main.js file and its purpose is to create the map, and display the markers
var lats = [];
var longs = [];
var city_names = [];
var markers = [];

//This loop will go through each of the cities in the cities.js file and push the coordinates to lats,longs, and city_names arrays
for (var x = 0; x < cities.length; x++) {
    $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+cities[x]+'&sensor=false', null, function (data) {
      var city = data.results[0].formatted_address;
      city_names.push(city);
      var p = data.results[0].geometry.location;
      lats.push(p.lat);
      longs.push(p.lng);

  });
}

// Initialize the map callback function
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: new google.maps.LatLng(39.828291, -97.676636)
  });

  var infowindow = new google.maps.InfoWindow();
  // Loop through the coordinates and create markers
  for (i = 0; i < lats.length; i++) {
      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lats[i], longs[i]),
          map: map,
          animation: google.maps.Animation.DROP,
          cat: 'Info Packets',
          icon: 'marker.png'
      });

      markers.push(marker);


    //This block is used to create the info markers for each city
    google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
        return function () {
            infowindow.setContent('<h4> ' + city_names[i] + '</h4>');
            infowindow.open(map, marker);
        }
    })(marker, i));

    google.maps.event.addListener(marker, 'mouseout', function(){
      infowindow.close();
    });
  }

  // This is used to toggle the visibility of the markers
  $('#toggle').change(function() {
      for (var marker in markers) {
        if(markers[marker].getVisible()) {
          markers[marker].setVisible(false);
        }
        else {
          markers[marker].setVisible(true);
        }
      }
    });
}
