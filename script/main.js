
    var lats = [];
    var longs = [];
    var city_names = [];

    for (var x = 0; x < cities.length; x++) {
        $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+cities[x]+'&sensor=false', null, function (data) {
          var p = data.results[0].geometry.location
          lats.push(p.lat);
          longs.push(p.lng);
      });
    }

    function initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: new google.maps.LatLng(39.828291, -97.676636)
      });

      var infowindow = new google.maps.InfoWindow();

      for (i = 0; i < lats.length; i++) {
          var marker = new google.maps.Marker({
              position: new google.maps.LatLng(lats[i], longs[i]),
              map: map,
              animation: google.maps.Animation.DROP
          });

          google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
              return function () {
                  infowindow.setContent(cities[i]);
                  infowindow.open(map, marker);
              }
          })(marker, i));

        google.maps.event.addListener(marker, 'mouseout', function(){
          infowindow.close();
        });
      }
    }
