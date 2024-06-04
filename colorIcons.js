var pmval = 10; // temp value 
				//  var pmval = pm25[i][2];  // use US AQI standard (modified per https://airnow.gov/index.cfm?action=aqibasics.aqi)
				if (pmval > 350) {
					// build "dot"           
					circle = {
						path: google.maps.SymbolPath.CIRCLE,
						fillColor: '#7e0023', // maroon
						fillOpacity: 0.4,
						scale: 9.0,
						strokeColor: 'white',
						strokeWeight: 1
					};

				} else if (pmval > 250) {

					circle = {
						path: google.maps.SymbolPath.CIRCLE,
						fillColor: '#7e0023', // maroon
						fillOpacity: 0.4,
						scale: 9.0,
						strokeColor: 'white',
						strokeWeight: 1
					};

				} else if (pmval > 150) {

					circle = {
						path: google.maps.SymbolPath.CIRCLE,
						fillColor: '#8f3f97', // purple
						fillOpacity: 0.4,
						scale: 9.0,
						strokeColor: 'white',
						strokeWeight: 1
					};

				} else if (pmval > 50.5) {

					circle = {
						path: google.maps.SymbolPath.CIRCLE,
						fillColor: '#ff0000', // red
						fillOpacity: 0.4,
						scale: 9.0,
						strokeColor: 'white',
						strokeWeight: 1
					};

				} else if (pmval > 25.5) {

					circle = {
						path: google.maps.SymbolPath.CIRCLE,
						fillColor: '#ff7e00', // orange
						fillOpacity: 0.4,
						scale: 9.0,
						strokeColor: 'white',
						strokeWeight: 1
					};

				} else if (pmval > 12.5) {

					circle = {
						path: google.maps.SymbolPath.CIRCLE,
						fillColor: '#ffff0O', // yellow
						fillOpacity: 0.4,
						scale: 9.0,
						strokeColor: 'white',
						strokeWeight: 1
					};
				} else {
					circle = {
						path: google.maps.SymbolPath.CIRCLE,
						fillColor: '#00FF33', // green
						fillOpacity: 0.4,
						scale: 10.0,
						strokeColor: 'darkgreen',
						strokeWeight: 1
					};
				}
				bounds.extend(position);

				marker = new google.maps.Marker({
						position: position,
						draggable: true,
						searchTag: markers[i][3],
						searchName: markers[i][3],

						label: {
							text: markers[i][1],
							color: "#4682B4",
							fontSize: "15px",
							fontWeight: "bold"
						},
						// set marker color

						// set icon for BackpAQ, Purple Air, Met or Vaisala sensors
						// First check for no data received from either PM or Wind sensors...
						icon: {

							labelOrigin: new google.maps.Point(65, 15),

							url: (function() {
								if (markers[i][1] == "") { // if no data received ....
									alert("No data!");
									return circle; // set circle markers
								} else if (markers[i][2].indexOf("BackpAQ") >= 0) { // check for BackpAQ sensors
									markerType = "BackpAQ";
									return backpackImage; // set BackpAQ markers
								} else if (markers[i][2].indexOf("Met") >= 0) { // check for Met sensors
									markerType = "Met";
									return windGaugeImage; // set wind markers
								} else if (markers[i][2].indexOf("Vaisala") >= 0) { // if Vaisala
									markerType = "Vaisala";
									return vaisala1Image; // Vaisala sensor
								} else {
									markerType = "PA";
									return purpleAir1Image; // set Purple Air marker
								}

							})()
						},

						animation: google.maps.Animation.DROP,

						map: map,

						title: markers[i][1] + "  at " + markers[i][3]

					}), // marker