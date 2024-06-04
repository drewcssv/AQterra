	// display markers for each BAAQMD monitoring station, using BAAQMD icon
		function displayBAAQMD(data) {

			for (i = 0; i < data.length; i++) {
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(data[i].Location_Lat, data[i].Location_Lon),
					icon: "https://www.backpaqlabs.com/images/baaqmd.png",
					map: map
				});

				// add event listeners for the buttons
				document
					.getElementById("show-markers")
					.addEventListener("click", showMarkers);
				document
					.getElementById("hide-markers")
					.addEventListener("click", hideMarkers);
				document
					.getElementById("delete-markers")
					.addEventListener("click", deleteMarkers);

				BAQMarkers.push(marker); //push each marker onto an array to manage 

				// event handlers for mouse over and mouse out    
				google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
					return function() {

						var lat = data[i].Location_Lat;
						var lng = data[i].Location_Lon;

						bbox = getBoundsFromLatLng(lat, lng, 2);
						// console.log(bbox);

						var lat_min = bbox.lat_min;
						var lng_min = bbox.lon_min;
						var lng_max = bbox.lon_max;
						var lat_max = bbox.lat_max;

						var pmValue, no2Value, ozValue;
						// get Current AQ Data from EPA API
						var url = "https://www.airnowapi.org/aq/data/?" +
							"parameters=OZONE,PM25,PM10,CO,NO2&" +
							"BBOX=" + lng_min + "," + lat_min + "," + lng_max + "," + lat_max + "&dataType=C&" +
							"format=application/json&verbose=1&monitorType=0&includerawconcentrations=0&" +
							"API_KEY=21393772-95EF-4851-BE2C-F42562A236FD";

						var request = new XMLHttpRequest();
						var utc, station;
						request.open("GET", url, false);
						request.send(null);

						var j1 = JSON.parse(request.responseText);

						if (typeof(j1[1]) === 'undefined') {
							utc = "not avail";
						} else {
							utc = j1[1].UTC;
						} // time of reading

						if (typeof(j1[1]) === 'undefined') {
							SiteName = "not avail";
						} else {
							station = j1[1].SiteName;
						} // source

						if (typeof(j1[1]) === 'undefined') {
							pmValue = "none";
						} else {
							pmValue = j1[1].Value;
						} // pm

						if (typeof(j1[2]) === 'undefined') {
							ozValue = "none";
						} else {
							ozValue = j1[2].Value;
						} // ozone

						if (typeof(j1[3]) === 'undefined') {
							no2Value = "none";
						} else {
							no2Value = j1[3].Value;
						} // NO2

						infowindow7.setContent("<b>BAAQMD Monitoring Station</b>" + "<hr>" + "<b>Station Name: </b>" + station + "<br>" +

							"Latest NowCast PM2.5: " + "<b>" + pmValue + "</b>" + " µg/m3" + "<br>" +
							"Latest NowCast Ozone : " + "<b>" + ozValue + "</b>" + " ppb" + "<br>" +
							"Latest NowCast NO2 : " + "<b>" + no2Value + "</b>" + " ppb" + "<hr>" +
							"Data current as of " + utc + "<br>" +
							"<br>Location: " + data[i].Address + "<br>" +
							"<b>Pollutants Monitored: </b>" + data[i].Pollutants_Monitored);
						// "<b>Notes: </b>" + data[i].Notes);

						infowindow7.open(map, marker);
					}
				})(marker, i));

				google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
					return function() {
						infowindow7.close();
					}
				})(marker, i));
			}
		}