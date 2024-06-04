  async function getGoogleAQI() {
       	const url = 'https://airquality.googleapis.com/v1/currentConditions:lookup?key=AIzaSyC9cwbKnz2iZqFWazHkaqyigA40tSK3s5g';
       	
       	const pmUnits = " µg/m³"; // units for all PM-related values
       	const ppbUnits = "ppb";
       	const spacer1 = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
       	
        //localize to ESUHSD offices
        const data = {
          "universal_aqi": true,
          "location": {
          "latitude": 37.419734,
          "longitude": -122.0827784
        },
       "extra_computations": [
       "HEALTH_RECOMMENDATIONS",
        "DOMINANT_POLLUTANT_CONCENTRATION",
       "POLLUTANT_CONCENTRATION",
       "LOCAL_AQI",
       "POLLUTANT_ADDITIONAL_INFO"
       ],
       "language_code": "en"
      };
    // send {POST request 
      const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type':  'application/json',
        },
        body: JSON.stringify(data),
      });
    // Process reponse
     if (response.ok) {
       const jsonResponse = await response.json();
       console.log(jsonResponse);
      // General indices
       var aqiName = jsonResponse.indexes[1].displayName;
       var aqi = jsonResponse.indexes[1].aqi;
       var category = jsonResponse.indexes[1].category;
       var domPoll = jsonResponse.indexes[1].dominantPollutant;
      // CO
       var COLevel = jsonResponse.pollutants[0].concentration.value; 
       var COUnits = ppbUnits;
      // NO2
       var NO2Level = jsonResponse.pollutants[1].concentration.value; 
       var NO2Units = ppbUnits;
      //O3
       var O3Level = jsonResponse.pollutants[2].concentration.value; 
       var O3Units = ppbUnits;
      // PM10
       var PM10Level = jsonResponse.pollutants[3].concentration.value; 
       var PM10Units = pmUnits;
       // PM25
       var PM25Level = jsonResponse.pollutants[4].concentration.value; 
       var PM25Units = pmUnits;
      //SO2
       var SO2Level = jsonResponse.pollutants[5].concentration.value; 
       var SO2Units = ppbUnits;
       
       var infowindowG = new google.maps.InfoWindow();

       myHTMLss = "<div style='width:350px; text-align:left;'>" + "";
       myHTMLss += "<font color = 'green' size='4'>"  + "<b>Crowdsourced Air Quality Snapshot</font></b><br>";
       myHTMLss += "<p></p>";
       myHTMLss += myHTMLss = aqiName + "<br>";
       myHTMLss += "<font color='red' size='2'>" + aqi + "</font>" + "&nbsp;&nbsp;"+ "<b>" + "<font size='3'>" + category + "</font></b>" + "<br>";
       myHTMLss += "<b><font size='-1'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dominant Pollutant: </b>" + domPoll + "</font><br>";
       myHTMLss += "<hr>";
       myHTMLss += "<font color = 'blue' size='3'>" + "<b>Detailed Pollutant Values</b></font><br>";
       myHTMLss += "<p></p>";
       myHTMLss += "<b>CO</b>   " + spacer1 + "&nbsp;&nbsp;&nbsp;&nbsp;" + COLevel + "&nbsp;&nbsp;" + COUnits + "<br>";
       myHTMLss += "<font size='1'>Carbon monoxide</font> <br>";
       myHTMLss += "<b>NO2</b>   " + spacer1 + "&nbsp;&nbsp;&nbsp;" + NO2Level  + "&nbsp;&nbsp;" + NO2Units + "<br>";
       myHTMLss += "<font size='1'>Nitrogen dioxide</font> <br>";
       myHTMLss += "<b>O3</b>   " + spacer1 + "&nbsp;&nbsp;&nbsp;&nbsp;" +  O3Level  + "&nbsp;&nbsp;" +  O3Units + "<br>";
       myHTMLss += "<font size='1'>Ozone</font> <br>";
       myHTMLss += "<b>PM10</b>   " + spacer1 + PM10Level + "&nbsp;&nbsp;" + PM10Units + "<br>";
       myHTMLss += "<font size='1'>Fine particulate matter (< 10 µm )</font><br>";
       myHTMLss += "<b>PM25</b>   " + spacer1 + PM25Level + "&nbsp;&nbsp;" + PM25Units + "<br>";
       myHTMLss += "<font size='1'>Fine particulate matter (< 2.5 µm )</font><br>";
       myHTMLss += "<b>SO2</b>   " + spacer1  + "&nbsp;&nbsp;" + SO2Level +  "&nbsp;&nbsp;" + SO2Units + "<br>"; 
       myHTMLss += "<font size='1'>Sulphur dioxide </font><br>";
       myHTMLss += "<p></p>";
       myHTMLss += "<font color = 'green' size='2'>"  + "<b>Data Source: Google Maps</font></b><br></div>";
       infowindowG.setContent(myHTMLss);
       infowindowG.setPosition(map.getCenter());
       infowindowG.open(map);
  
     } else {
        console.error('Request failed with status:', response.status);
      }
				   
                      
				   /* add listener for click on icon & open infowindow 
                    
                    map.data.addListener('click', function(event) {
                    
                    
                       });   // add listener  
                    
                */
       
       
       	
       }