  // This is the main.js file and its purpose is to create the map, and display the markers
  var lats = [];
  var longs = [];
  var city_names = [];
  var markers = [];

  //This loop will go through each of the cities in the info_request_cities.js file and push the coordinates to lats,longs, and city_names arrays for information packets
  for (var x = 0; x < cities.length; x++) {
    $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+cities[x]+'&sensor=false', null, function (data) {
      var city = data.results[0].formatted_address;
      city_names.push(city);
      var p = data.results[0].geometry.location;
      lats.push(p.lat);
      longs.push(p.lng);
    });
  }

  // This block is used to store information about campus tours
  var tour_lats = [];
  var tour_longs = [];
  var tour_city_names = [];
  var tour_markers = [];
  //This loop will go through each of the cities in the campus_tour_cities.js file and push the coordinates to lats,longs, and city_names arrays for information packets
  for (var t = 0; t < tour_cities.length; t++) {
    $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+tour_cities[t]+'&sensor=false', null, function (data) {
      var city = data.results[0].formatted_address;
      tour_city_names.push(city);
      var p = data.results[0].geometry.location;
      tour_lats.push(p.lat);
      tour_longs.push(p.lng);
    });
  }

  // Initialize the map callback function
  function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 4,
  center: new google.maps.LatLng(39.828291, -97.676636)
  });

  var infowindow = new google.maps.InfoWindow();
  // Loop through the coordinates and create markers for information_request cities
  for (var i = 0; i < tour_lats.length; i++) {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(tour_lats[i], tour_longs[i]),
        map: map,
        cat: 'Tours',
        icon: 'tour_marker.png'
        });
    tour_markers.push(marker);
    marker.setMap(map);

  //This block is used to create the info markers for each city
  google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
      return function () {
          infowindow.setContent('<h4> ' + tour_city_names[i] + '</h4>');
          infowindow.open(map, marker);
      }
  })(marker, i));

  google.maps.event.addListener(marker, 'mouseout', function(){
    infowindow.close();
  });
  }

  for (var i = 0; i < lats.length; i++) {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lats[i], longs[i]),
        map: map,
        cat: 'Info Packets',
        icon: 'info_marker.png'
    });
    markers.push(marker);
    marker.setMap(map);

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
  $('#info_packet_toggle').change(function() {
    for (var marker in markers) {
      if(markers[marker].getVisible()) {
        markers[marker].setVisible(false);
      }
      else {
        markers[marker].setVisible(true);
      }
    }
  });

  $('#tour_toggle').change(function() {
      for (var marker in tour_markers) {
        if(tour_markers[marker].getVisible()) {
          tour_markers[marker].setVisible(false);
        }
        else {
          tour_markers[marker].setVisible(true);
        }
      }
    });
  }
