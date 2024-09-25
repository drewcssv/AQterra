function getAQIDescription(aqi) {
			if (aqi >= 401) {
				return 'Hazardous';
			} else if (aqi >= 301) {
				return 'Hazardous';
			} else if (aqi >= 201) {
				return 'Very Unhealthy';
			} else if (aqi >= 151) {
				return 'Unhealthy';
			} else if (aqi >= 101) {
				return 'Unhealthy for Sensitive Groups';
			} else if (aqi >= 51) {
				return 'Moderate';
			} else if (aqi >= 0) {
				return 'Good';
			} else {
				return undefined;
			}
	}

		function getAQIIconURL(aqi) {

			if (aqi >= 401) {
				return 'https://maps.google.com/mapfiles/kml/paddle/purple-circle.png';
			} else if (aqi >= 301) {
				return 'https://maps.google.com/mapfiles/kml/paddle/purple-circle.png';
			} else if (aqi >= 201) {
				return 'https://maps.google.com/mapfiles/kml/paddle/purple-circle.png';
			} else if (aqi >= 151) {
				return 'https://maps.google.com/mapfiles/kml/paddle/red-circle.png';
			} else if (aqi >= 101) {
				return 'https://maps.google.com/mapfiles/kml/paddle/orange-circle.png';
			} else if (aqi >= 51) {
				return 'https://maps.google.com/mapfiles/kml/paddle/ylw-circle.png';
			} else if (aqi >= 0) {
				return 'https://maps.google.com/mapfiles/kml/paddle/grn-circle.png';
			} else {
				return undefined;
			}
		}
		/*
		function getPMIconURL(pmVal) {

			if (pmVal >= 401) {
				return 'https://maps.google.com/mapfiles/kml/paddle/purple-circle.png';
			} else if (pmVal >= 250) {
				return 'https://maps.google.com/mapfiles/kml/paddle/purple-circle.png';
			} else if (pmVal >= 150) {
				return 'https://maps.google.com/mapfiles/kml/paddle/purple-circle.png';
			} else if (pmVal >= 55) {
				return 'https://maps.google.com/mapfiles/kml/paddle/red-circle.png';
			} else if (pmVal >= 35) {
				return 'https://maps.google.com/mapfiles/kml/paddle/orange-circle.png';
			} else if (pmVal >= 12) {
				return 'https://maps.google.com/mapfiles/kml/paddle/ylw-circle.png';
			} else if (pmVal >= 0) {
				return 'https://maps.google.com/mapfiles/kml/paddle/grn-circle.png';
			} else {
				return undefined;
			}
		}*/
		// Updated 2/7/2024 with revised PM breakpoints
		function getPMIconURL(pmVal) {
			if (pmVal >= 225) {
				return 'https://www.backpaqlabs.com/images/marker-teal.png'; // Hazardous
			} else if (pmVal >= 125) {
				return 'https://www.backpaqlabs.com/images/marker-teal.png'; // Very Unhealthy
			} else if (pmVal >= 55) {
				return 'https://www.backpaqlabs.com/images/marker-red.png'; // Unhealthy
			} else if (pmVal >= 35) {
				return 'https://www.backpaqlabs.com/images/marker-orange.png'; // Unhealthy for Sensitive
			} else if (pmVal >= 9) {
				return 'https://www.backpaqlabs.com/images/marker-yellow.png'; // Moderate
			} else if (pmVal >= 0) {
				return 'https://www.backpaqlabs.com/images/marker-green.png'; // Good
			} else {
				return undefined;
			}
		}
		// Updated 2/24 per revised EPA breakpoints
		// Updated 9/1/24 to include blue outline on markers indicating comments
		function getPMColor(pmval, comments) {
			
			if (pmval > 225.4) {
				
				 if (comments != '') { // if there is a comment here
					  
					  circle = {
						path: google.maps.SymbolPath.CIRCLE,
						fillColor: '#7e0023', // maroon
						fillOpacity: 0.9,
						scale: 9.0,
						strokeColor: 'blue',
						strokeWeight: 1,
					  };
		         }
				  else { 
					          
					 circle = {
						path: google.maps.SymbolPath.CIRCLE,
						fillColor: '#7e0023', // maroon
						fillOpacity: 0.8,
						scale: 9.0,
						strokeColor: 'white',
						strokeWeight: 1,
						
					 };
		            }

				} else if (pmval > 125.4) {
					
					if (comments != '') { // if there is a comment here
					  
					  circle = {
						path: google.maps.SymbolPath.CIRCLE,
						fillColor: '#8f3f97', // purple
						fillOpacity: 0.9,
						scale: 9.0,
						strokeColor: 'blue',
						strokeWeight: 1,
					  };
		            }
					else { 

					  circle = {
						path: google.maps.SymbolPath.CIRCLE,
						fillColor: '#8f3f97', // purple
						fillOpacity: 0.8,
						scale: 9.0,
						strokeColor: 'white',
						strokeWeight: 1,
						
					  };
		            }

				} else if (pmval > 55.4) {
					
					if (comments != '') { // if there is a comment here
					  
					  circle = {
						path: google.maps.SymbolPath.CIRCLE,
						fillColor: '#ff0000', // red
						fillOpacity: 0.9,
						scale: 9.0,
						strokeColor: 'blue',
						strokeWeight: 1,
					  };
		            }
					else { 

					  circle = {
						path: google.maps.SymbolPath.CIRCLE,
						fillColor: '#ff0000', // red
						fillOpacity: 0.8,
						scale: 9.0,
						strokeColor: 'white',
						strokeWeight: 1,
			          };	
					}

				} else if (pmval > 35.4) {
					
					if (comments != '') { // if there is a comment here
					  
					  circle = {
						path: google.maps.SymbolPath.CIRCLE,
						fillColor: '#ff7e00', // orange
						fillOpacity: 0.9,
						scale: 9.0,
						strokeColor: 'blue',
						strokeWeight: 1,
					  };
		            }
					else { 

					 circle = {
						path: google.maps.SymbolPath.CIRCLE,
						fillColor: '#ff7e00', // orange
						fillOpacity: 0.8,
						scale: 9.0,
						strokeColor: 'white',
						strokeWeight: 1,
						
					 };
	             	}

				} else if (pmval > 9) {

                   if (comments != '') { // if there is a comment here
					  
					  circle = {
						path: google.maps.SymbolPath.CIRCLE,
						fillColor: '#00FF33', // green
						fillOpacity: 0.9,
						scale: 9.0,
						strokeColor: 'blue',
						strokeWeight: 1,
					  };
		            }
					else { 
                    
					  circle = {
						path: google.maps.SymbolPath.CIRCLE,
						fillColor: '#ffff00', // yellow
						fillOpacity: 0.8,
						scale: 9.0,
						strokeColor: 'white',
						strokeWeight: 1,
		         	  };
					}
					
				} else {
					
					if (comments != '') { // if there is a comment here
					  
					  circle = {
						path: google.maps.SymbolPath.CIRCLE,
						fillColor: '#00FF33', // green
						fillOpacity: 0.9,
						scale: 9.0,
						strokeColor: 'blue',
						strokeWeight: 1,
					  };
		            }
					else {
					  circle = {
						path: google.maps.SymbolPath.CIRCLE,
						fillColor: '#00FF33', // green
						fillOpacity: 0.7,
						scale: 9.0,
						strokeColor: 'white',
						strokeWeight: 1,	
					  };
					}
				}
			
			return circle;
		}
		
       
        
		function getAQIMessage(aqi) {
			if (aqi >= 401) {
				return '>401: Health alert: everyone may experience more serious health effects';
			} else if (aqi >= 301) {
				return '301-400: Health alert: everyone may experience more serious health effects';
			} else if (aqi >= 201) {
				return '201-300: Health warnings of emergency conditions. The entire population is more likely to be affected. ';
			} else if (aqi >= 151) {
				return '151-200: Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.';
			} else if (aqi >= 101) {
				return '101-150: Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
			} else if (aqi >= 51) {
				return '51-100: Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.';
			} else if (aqi >= 0) {
				return '0-50: Air quality is considered satisfactory, and air pollution poses little or no risk';
			} else {
				return undefined;
			}
		}