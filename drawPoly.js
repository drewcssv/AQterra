function drawPoly(markersP, pmVals, co2Vals) {
	
var infowindow9;

var drawingManager = new google.maps.drawing.DrawingManager({
                drawingMode: google.maps.drawing.OverlayType.MARKER,
                  polygonOptions: {
                    fillColor: 'red',
                    strokeColor: 'red',
                    fillOpacity: .2,
                    editable: false,
                    draggable: true
                  },
                  drawingControl: true,
                  drawingControlOptions: {
                  position: google.maps.ControlPosition.TOP_RIGHT,
                  drawingModes: ['polygon']
                 },
                drawingMode: null
               });
       
       infowindow9 = new google.maps.InfoWindow();
       // listen for complete polygon, then compute area and markers inside
          var polyCompleteHandle = google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
  	       var pmPolyVals = 0;
  	       var co2PolyVals = 0;
            drawingManager.setDrawingMode(null); // Switch back to non-drawing mode after drawing a shape.
            var area = google.maps.geometry.spherical.computeArea(polygon.getPath());
            var poly = polygon.getPath();

            var markerCnt = 0;
            
            for (var i=0; i<markersP.length; i++) {
              
              if (google.maps.geometry.poly.containsLocation(markersP[i].getPosition(), polygon)) {
                markerCnt++;
                pmPolyVals += parseInt(pmVals[i]); //grab PM2.5 value for this marker
                co2PolyVals += parseInt(co2Vals[i]); // grab CO2 value
                
              }
            }  

            if (markerCnt > 0)
            {
             infowindow9.setContent("<div style='width:250px; text-align:left;'>" + "<b>Selection area: </b>"+(area*10.764).toFixed(2) +" sq feet" + "<br>" +
             "<b># of markers in the box: </b>" + markerCnt + "<br>" +
             "<b>Avg. PM2.5 of markers in box: </b>" + (pmPolyVals / markerCnt).toFixed(1) + " ug/m3" + "<br>" +
             "<b>Avg. CO2 of markers in box: </b>"   + (co2PolyVals / markerCnt).toFixed(0) + " ppm" + "</DIV>");
            }
            else
            {
              infowindow9.setContent("No markers in box. Select at least one marker.");
            }
            infowindow9.setPosition(polygon.getPath().getAt(0));
            infowindow9.open(map);
          // Insert  
           var insertHandle = google.maps.event.addListener(polygon.getPath(), 'insert_at', function(index, obj) {
           
           pmPolyVals = 0;
           co2PolyVals = 0;
           var area = google.maps.geometry.spherical.computeArea(polygon.getPath());
           var poly = polygon.getPath();
          
           var markerCnt = 0;
           for (var i=0; i<markersP.length; i++) {
              if (google.maps.geometry.poly.containsLocation(markersP[i].getPosition(), polygon)) {
                markerCnt++;
              
                pmPolyVals += parseInt(pmVals[i]); //grab PM2.5 value for this marker
                co2PolyVals += parseInt(co2Vals[i]); // grab CO2 value
              }
            }  
            if (markerCnt > 0)
            {
             infowindow9.setContent("<div style='width:250px; text-align:left;'>"+"<b>Selection area: </b>"+(area*10.764).toFixed(2)+" sq feet" + "<br>" +
             "<b># of markers in the box: </b>" + markerCnt + "<br>" + 
              "<b>Avg. PM2.5 of markers in box: </b>" + (pmPolyVals / markerCnt).toFixed(1) + " ug/m3" + "<br>" +
              "<b>Avg. CO2 of markers in box: </b>"   + (co2PolyVals / markerCnt).toFixed(0) + " ppb" + "</div>");
            }
            else
            {
             infoWindow9.setContent("No markers in box. Select at least one marker.");
            }
           infowindow9.setPosition(polygon.getPath().getAt(0));
           infowindow9.open(map);
           
           
           });
           
         // Set
           var setHandle = google.maps.event.addListener(polygon.getPath(), 'set_at', function(index, obj) {
           	pmPolyVals = 0;
           	co2PolyVals = 0;
            // alert("set");
           var area = google.maps.geometry.spherical.computeArea(polygon.getPath());
          
            var markerCnt = 0;
            for (var i=0; i<markersP.length; i++) {
              if (google.maps.geometry.poly.containsLocation(markersP[i].getPosition(), polygon)) {
                markerCnt++;
               // alert("PM2.5: " + pmVals[i]);
                pmPolyVals += parseInt(pmVals[i]); //grab PM2.5 value for this marker
                co2PolyVals += parseInt(co2Vals[i]); // grab CO2 value
              }
            }  
           if (markerCnt > 0)
           	{
              infowindow9.setContent("<div style='width:250px; text-align:left;'>" + "<b>Selection area: </b>"+(area*10.764).toFixed(2)+" sq feet" + "<br>" +
              "<b># of markers in the box: </b>" + markerCnt + "<br>" +
              "<b>Avg. PM2.5 of markers in box: </b>" + (pmPolyVals / markerCnt).toFixed(1) + " ug/m3" + "<br>" +
              "<b>Avg. CO2 of markers in box: </b>" + (co2PolyVals / markerCnt).toFixed(0) + " ppb" + "</div>");
            }
            else
            {
              infoWindow9.setContent("No markers in box. Select at least one marker.");
            }
              infowindow9.setPosition(polygon.getPath().getAt(0));
              infowindow9.open(map);
              
            
           });
           google.maps.event.addListener(polygon, 'click', function (event) {
            alert("Closing box");
           // Close up and clear listeners 
            polygon.setMap(null);
           // google.maps.event.removeListener(polyCompleteHandle);
           // google.maps.event.removeListener(setHandle);
           // google.maps.event.removeListener(insertHandle);
          }); 
        });
        
        drawingManager.setMap(map);		
			
		
	}	