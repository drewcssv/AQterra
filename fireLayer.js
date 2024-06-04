function fireLayer (){
//console.log("Setting Active Fires layer...");
			// Active Fires Layer
			// var url = "https://firms.modaps.eosdis.nasa.gov/data/active_fire/modis-c6.1/kml/MODIS_C6_1_USA_contiguous_and_Hawaii_24h.kml";
			//var url = "https://inciweb.nwcg.gov/feeds/maps/"; // fire data is from inciweb
			var url = "https://inciweb.wildfire.gov/feeds/maps/placemarks.kml";  // new link
			var kmlOptions = {
				preserveViewport: false // keep center as is 
			};

			activeFiresLayer = new google.maps.KmlLayer(url, kmlOptions);
			// kmlLayer.setMap(map); // show it
			
			//var fireURL = "https://incidents.fire.ca.gov/umbraco/api/IncidentApi/GeoJsonList?inactive=false";
			var fireURL = "https://www.backpaqlabs.com/geojson/fires.geojson";
			
			//$.getJSON(fireURL,function(result) {
              // loadGeoJsonFireString(result);
        /*
              map.data.addGeoJson(fireJSON);
             markerCollection = map.data.addGeoJson(fireJSON);
             Layer = new google.maps.Data();
            Layer.addGeoJson(fireJSON);
               
              var infowindowF = new google.maps.InfoWindow();
               
              //  loop through all features 
               for (var i = 0, length = markerCollection.length; i < length; i++) {
                  var feature = markerCollection[i];
                  map.data.setStyle(function(feature) {
                     return ({
                       icon: "https://www.backpaqlabs.com/images/fire-icon.png" // replace marker with fire icon
                     });
                  });
                      
				   // add listener for click on icon & open infowindow 
                    
                    map.data.addListener('click', function(event) {
                    var feat = event.feature;
                    var html = "<b>Wildfire Incident</b><hr>";
                    html += "<b>"+feat.getProperty('Name')+"</b><br>"+feat.getProperty('Location');
                    if (feat.getProperty('PercentContained')){
                      html += "<br><b>Percent Contained: </b>"+feat.getProperty('PercentContained');
                    }
                    else {
                      html += "<br><b>Percent Contained: </b>Not Avail";
                    }  
                    if (feat.getProperty('AcresBurned')){
                      html += "<br><b>Acres Burned: </b>"+feat.getProperty('AcresBurned');
                    }
                    else {
                      html += "<br><b>Acres Burned: </b>Not Avail";
                    }  
                    html +=  "<br><b>Updated: </b>"+feat.getProperty('Updated');
                    html += "<br><a class='normal_link' target='_blank' href='"+feat.getProperty('Url')+"'>Info</a>";
                    infowindowF.setContent(html);
                    infowindowF.setPosition(event.latLng);
                    infowindowF.setOptions({pixelOffset: new google.maps.Size(0,-34)});
                    infowindowF.open(map);
                    
                   });   // add listener  
                    
                }; // for
                 
            
            */
}