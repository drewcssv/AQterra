 // Module to perform new user experience for AQView
 // Assumed that "global map" has been defined and Community URL has been selected. 
 // Handles drag and drop of *properly formatted* CSV file
   
  function fetchSessionsData(m_device, communityUrl, startDate , endDate ) {
    // If startDate and endDate are provided, append them to the URL
    let urlWithDates = communityUrl;
    if (startDate && endDate) {
        urlWithDates += `&start=${encodeURIComponent(startDate)}&end=${encodeURIComponent(endDate)}`;
    }
    
     return fetch(urlWithDates)
        .then(response => response.text())
        .then(csvText => {
            parseAndDisplayCSVData(m_device, csvText);
        })
        .catch(error => {
            console.error('Error fetching or parsing CSV data:', error);
        });
}

// New function to parse CSV text and display session boxes
function parseAndDisplayCSVData(m_device, csvText) {
	
    // Parse the CSV data using PapaParse 
    // const parsedData = Papa.parse(csvText, { header: true, skipEmptyLines: true }).data;
       parsedData = Papa.parse(csvText, { header: true, skipEmptyLines: true }).data;
        // Group rows by session and calculate start and end times
        isLegacy = 0;
        const sessionsBySessionId = parsedData.reduce((acc, row) => {
            var sessionId = row['field1'];//session
         
            if (sessionId == 'xxxxxxxxxx'){ // check for legacy "userId"
            	sessionId = 1;
            	isLegacy = 1;
            }
            if (sessionId == 'START')  { // more legacy
            	sessionId = 99;
            	isLegacy = 1;
            }
            if (sessionId == 'STOP') { // legacy
            	sessionId = 100;
            	isLegacy = 1;
            }
            var  description = row['field5']; // description
            if (description.includes('no name')) { // check for legacy "trackname"
            	description = m_device; // default to backpaq name
            }
            console.log("Session Read: " + sessionId);
            const formattedCreatedAt = formatDate(row['created_at']);        
            
            if (!acc[sessionId]) {
                acc[sessionId] = {
                    id: sessionId,
                    markers1: [],
                    chartData: [],
                    timeStart: formattedCreatedAt,
                    timeEnd: formattedCreatedAt, // Initialize end time to the first timestamp
                    community: currentCommunity,
                    description: description,
                    device: row['status'], //BackpAQ device name
                    comments: row['field8'], // comments    
                    m_device: m_device // for legacy support
                };
            } else {
                // Update timeEnd if the current row's timestamp is later than the stored timeEnd
                if (new Date(formattedCreatedAt) > new Date(acc[sessionId].timeEnd)) {
                    acc[sessionId].timeEnd = formattedCreatedAt;
                }
            }	
            // Filter out markers with latitude or longitude of 0 to avoid *equator*
            const lat = parseFloat(row['field2']); // lat
            const lng = parseFloat(row['field3']); // lng
            if (lat !== 0 && lng !== 0) {
            // Add markers and chart data...
             acc[sessionId].markers1.push({
                lat: lat,
                lng: lng,
                iconURL: row['field6'], //marker icon
                pm25: parseFloat(row['field4']), // pm2.5
                co2: parseFloat(row['field7']), //co2
                comments: row['field8'] // comments
             });
			}    

            acc[sessionId].chartData.push({
                created_at: row['created_at'],
                pm25: parseFloat(row['field4']),// pm2.5
                co2: parseFloat(row['field7']), // co2
                
            });
            
            return acc;
        }, {});

       // Convert sessions object back into an array and display them
        const sessions = Object.values(sessionsBySessionId);
        
        console.log(" First Sessions:", sessions);
        if (Array.isArray(sessions) && sessions.length > 0) {
           addSessionBoxes(sessions);
        } else {
           console.error("Sessions data is not an array or is empty.");
           alert("No data found...try a different date.");
        }    
  }
   
  function searchSessions(startTrackDate, endTrackDate) {
    // Assuming allSessions is populated with session data
    //const allSessions = [...]; // Place your sessions data here or fetch it

    // Convert startTrackDate and endTrackDate to Date objects for comparison
    const start = new Date(startTrackDate);
    const end = new Date(endTrackDate);

    const filteredSessions = allSessions.filter(session => {
        // Assuming session.timeStart and session.timeEnd are in 'YYYY-MM-DD HH:mm:ss' format
        const sessionStart = new Date(session.timeStart);
        const sessionEnd = new Date(session.timeEnd);

        // Check if the session's time range overlaps with the selected time range
        return sessionEnd >= start && sessionStart <= end;
    });

    // Now you have filteredSessions based on the selected date range
    // Proceed to display these sessions, e.g., by calling addSessionBoxes(filteredSessions)
    addSessionBoxes(filteredSessions);
}
  
   function addSessionBoxes(sessions) {
      const sessionContainer = document.getElementById("session-container");
      const sessionLabel = document.getElementById("session-label");
      
      //  color breakpoints for PM2.5 values from EPA AQI guidelines
      const getColorForValue = (value) => {
       if (value <= 12) return '#00ff00'; // Good Green
       if (value <= 35.5) return '#ffff00'; // Moderate Yellow
       if (value <= 55.5) return '#ff7e00'; // Unhealthy for Sensitive Groups Orange
       if (value <= 150.5) return '#ff0000'; // Unhealthy  Red
       if (value <= 250.5) return '#A020F0'; // Hazardous  Purple
      return '#99004c'; // Very Unhealthy  Maroon
      };    
          
      if (sessions.length > 0) { // if we have found sessions data 
       
            sessions.forEach(session => {
            	
             // Calculate average PM2.5
             let totalPM25 = 0;
              session.markers1.forEach(marker => {
                totalPM25 += marker.pm25;
              });
             let averagePM25 = totalPM25 / session.markers1.length;

             // create a new session box		
              const box = document.createElement("div");
              box.classList.add("session-box");

              const title = document.createElement("div");
              title.textContent = session.device + " Session: " + session.id;
              title.style.fontSize = 'medium';

              const description = document.createElement("div");
              description.textContent = session.description;
              description.style.fontSize = 'medium';
              
              const time = document.createElement("div");
             // time.textContent = session.timeStart.slice(2, 19)+ " - " + session.timeEnd.slice(2, 19); // show session time
              time.textContent = session.timeStart + " - " + session.timeEnd ; // show session time
              time.style.fontSize = 'small';

              box.appendChild(title);
              box.appendChild(description);
              box.appendChild(time);
              
             // change session-box hover color to match session PM2.5 average 
              
             box.onmouseover = function() {
                this.style.border = `3px solid ${getColorForValue(averagePM25)}`;
             };

             box.onmouseleave = function() {
                this.style.border = "";
             };
              
             currentSessionId = session.id;

             // handle on-click event for session box
             box.onclick = () => {
               if (!keepMarkers) {
                  clearMarkers(true); // Clear all markers except for the current session's
               }
    
              // Proceed to add markers and polyline for the new session
              const sessionMarkers = addMarkers(session.markers1);
              sessionMarkersMap[session.id] = sessionMarkers; // Store new session's markers
                         
               // calc bounds and center, set zoom to show all markers 
                var bounds = new google.maps.LatLngBounds();
                for(i=0;i<sessionMarkers.length;i++) {
                  bounds.extend(sessionMarkers[i].getPosition());
                }
                map.setCenter(bounds.getCenter());
                map.fitBounds(bounds);

               // Clear existing polyline if any
               if (currentPolyline) {
                currentPolyline.setMap(null);
               }

               // Create color-coded polyline segments
               let lastColor = null;
               let segmentPath = [];

               session.markers1.forEach((marker, index) => {
                let color = getColorForValue(marker.pm25);
                if (color !== lastColor && segmentPath.length > 0) {
                    // Finish the current segment
                    let polyline = new google.maps.Polyline({
                        path: segmentPath,
                        geodesic: true,
                        strokeColor: lastColor,
                        strokeOpacity: 0.75,
                        strokeWeight: 4
                    });
                    polyline.setMap(map);
                    activePolylines.push(polyline);
                    currentPolyline = polyline; // update the currentPolyline
                    console.log("Added a new polyline.");    
                    activePolylines.push(polyline); // Store the polyline
                    segmentPath = []; // Start a new segment
                }

                segmentPath.push({ lat: marker.lat, lng: marker.lng });
                lastColor = color;

                // Ensure the last segment is added
                if (index === session.markers1.length - 1) {
                    let polyline = new google.maps.Polyline({
                        path: segmentPath,
                        geodesic: true,
                        strokeColor: color,
                        strokeOpacity: 0.75,
                        strokeWeight: 4
                    });
                    
                    polyline.setMap(map);
                    activePolylines.push(polyline);
                    currentPolyline = polyline; // update the currentPolyline
                    console.log("Added a new polyline.");    
                    
                }                
                
            });   
              // display chart and info box for this session  		      
              sessionMarkersMap[session.id] = sessionMarkers; // Store markers by session ID
              showChart(session.chartData, session.timeStart, session.timeEnd, session.device, session.m_device, session.community, session.description, sessionMarkers, session.id); 
		  }; 
              sessionContainer.appendChild(box); // display session box
        });
           
          sessionContainer.style.display = "block"; // make visible
          sessionLabel.style.display = "block"; 
            
         } else {
          sessionContainer.style.display = "none"; // don't display if no session data
          sessionLabel.style.display = "none";
         }
  }      
 
      function addMarkers(locations) {
        return locations.map(location => {
        
          const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
           
            // Use 'iconURL' to reference the icon URL
            icon:  getPMColor(location.pm25), // set circle markers	
					
            title: "PM2.5: " + location.pm25 + unitsPM + ", CO2: " + location.co2 + "ppm, Comments: " + location.comments,
           // label: xxx,
            map: map,
          });        
          
         return marker;
       });
      }
      
   function addPolyline(polyline) {
       activePolylines.push(polyline);
       currentPolyline = polyline; // update the currentPolyline
       console.log("Added a new polyline.");
   }
      
   function clearMarkers(keepCurrentSession = false) {
    console.log("Clearing markers. Keep current session:", keepCurrentSession);
    
    Object.keys(sessionMarkersMap).forEach(sessionId => {
        if (!keepMarkers || !keepCurrentSession || sessionId !== currentSessionId) {
            sessionMarkersMap[sessionId].forEach(marker => {
                marker.setMap(null);
            });
            delete sessionMarkersMap[sessionId];
            console.log("Cleared markers for session:", sessionId);
        }
    });

    // Clear the specific polyline for the session if not keeping current session
    if (currentPolyline && (!keepMarkers || !keepCurrentSession)) {
        currentPolyline.setMap(null);
        currentPolyline = null;
        console.log("Cleared current polyline.");
    }

    // Clear all polylines if not keeping any markers
    if (!keepMarkers || !keepCurrentSession) {
        activePolylines.forEach(polyline => {
            polyline.setMap(null);
        });
        activePolylines = [];
        console.log("Cleared all polylines.");
    }
  }

   function clearSessionBoxes() {
         const sessionContainer = document.getElementById("session-container");
         sessionContainer.innerHTML = '';
   }
        
    // ---- Add listeners to allow chart container to move up/down
        
   document.addEventListener('DOMContentLoaded', function() {
    const chartArea = document.getElementById('chart-area');
    let isDragging = false;
    let startY, startTop;

    chartArea.addEventListener('mousedown', function(e) {
        isDragging = true;
        startY = e.clientY; // Store the initial y position
        startTop = chartArea.offsetTop; // Store the initial top position
        e.preventDefault(); // Prevent text selection, etc.
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const deltaY = e.clientY - startY; // Calculate the vertical movement
            chartArea.style.top = `${startTop + deltaY}px`; // Update the top style
            startY = e.clientY; // Update startY to the current y position
            startTop = chartArea.offsetTop; // Update the startTop as the current top

            // Reflow the Highcharts chart inside the moved container
            Highcharts.charts.forEach(function(chart) {
                if (chart.container.parentNode === chartArea) {
                    chart.reflow(); // Adjusts the chart after container size changes
                }
            });
        }
        
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
 });
 
 Highcharts.setOptions({
    global: {
        useUTC: false
    }
});
 
  // ---------------------------------------------------------------  
 
   function showChart(sessionData, timeStart, timeEnd, device, m_device, community, desc, markers1, sessionId) {
   document.getElementById('chart-area').style.display = 'block';
   
   //console.log("SessionId: " + sessionId);
   
   let pmVals = [];
   let co2Vals = [];
  
  // Calculate summary statistics
    let totalPM25 = 0;
    let totalCO2 = 0;
    let minPM25 = Infinity;
    let maxPM25 = -Infinity;
    
    sessionData.forEach(dataPoint => {
        const pm25 = dataPoint.pm25;
        const co2 =  dataPoint.co2;
        totalPM25 += pm25;
        totalCO2 += co2;
        minPM25 = Math.min(minPM25, pm25);
        maxPM25 = Math.max(maxPM25, pm25);     
        pmVals.push(dataPoint.pm25);
		co2Vals.push(dataPoint.co2);          
    });
          
    const averagePM25 = totalPM25 / sessionData.length;
    const averageCO2 =  totalCO2 / sessionData.length;
    
    const descText = "'" + desc + "'";
    const justTime = timeEnd.slice(-9); // slice off date
    
    //const dLoadData = downloadTrackDDCSV(sessionData);
    
    if (device == null || device == '') { // if no device in csv file
    	device = m_device;
    }
    
    drawPoly(markers1, pmVals, co2Vals); // initialize polygon drawing tool
    
    // Display summary
    const summaryContainer = document.getElementById('summary-container');
    summaryContainer.innerHTML = `
     <div class="summaryTitle"><b>&nbsp;&nbsp;&nbsp;Summary for ${device}</b></div><hr>
    <div class="descriptionText"><b>Track:</b> ${desc}</div><br>
    <div class="communityText">Community:</b> ${community}</div><br>
    <div class="dataRow"><b>Avg PM2.5:</b> ${averagePM25.toFixed(2)} ${unitsPM}</div>
    <div class="dataRow"><b>Avg CO2:</b> ${averageCO2.toFixed(2)} ${unitsCO2}</div>
    <div class="dataRow"><b>Min PM2.5:</b> ${minPM25.toFixed(2)} ${unitsPM}</div>
    <div class="dataRow"><b>Max PM2.5:</b> ${maxPM25.toFixed(2)} ${unitsPM}</div><br>
    <div class="timeSpan"><b>Time Span:</b> ${timeStart} - ${justTime}</div><br>
    <button id="export-current-session" style="position: absolute; left: 55px; top: 310px;">Export Session Data</button>  
    `;
       
  // set the allowed units for data grouping
  groupingUnits = [
				   [
					'week', // unit name
					[1] // allowed multiples
				   ],
				   [
					'month',
					[1, 2, 3, 4, 6]
				   ]
                  ];
                  
       // Plugin to only run export-data on the visible range
       (function(H) {
           H.wrap(H.Chart.prototype, 'getDataRows', function(proceed, multiLevelHeaders) {
             var rows = proceed.call(this, multiLevelHeaders),
                xMin = this.xAxis[0].min,
                xMax = this.xAxis[0].max;

            rows = rows.filter(function(row) {
            return typeof row.x !== 'number' || (row.x >= xMin && row.x <= xMax);
           });

           return rows;
         });
        }(Highcharts));
        
     
  // Prepare the data for Highcharts
  
  const chartData1 = sessionData.map(dataPoint => {
    return {
      x: new Date(dataPoint.created_at).getTime(),         
      y: dataPoint.pm25 // y-axis: PM2.5 value
      
    };
  });
  const chartData2 = sessionData.map(dataPoint => {
    return {
      x: new Date(dataPoint.created_at).getTime(),
      y: dataPoint.co2 // y-axis: CO2 value
      
    };
  });

  Highcharts.stockChart('chart-container2', {
    chart: {
      zoomType: 'x' // Allows users to zoom in on the x-axis
    },
    rangeSelector: {
      selected: 1
    },
    title: {
      text: 'Air Quality Sensor Data Over Time'
    },
    xAxis: {
      type: 'datetime', // Specify that x-axis is in datetime format
      title: {
        text: 'Date and Time'
      }
    },
    yAxis: [{
			 labels: {
			  align: 'right',
			  x: -3
			 },	 
			 plotLines: [{
	
							value: 12,
							color: '#52cc50',
							width: 3,
							dashStyle: 'longdashdot',
                            zIndex : 3,
							label: {
								text: 'Good',
								x: 0,
								y: 15,
								style: {
                                    color: '#52cc50',
                                    fontWeight: 'bold'
                                }

							}
						}, {
							
							value: 35,
							color: '#f0ea41',
							width: 3,
							dashStyle: 'longdashdot',
                            zIndex : 3,
							label: {
								text: 'Moderate',
								x: 0,
								y: 15,
								style: {
                                    color: '#f0ea41',
                                    fontWeight: 'bold'
                                }

							}
						}, {
							
							value: 55,
							color: '#f0b641',
							width: 3,
							dashStyle: 'longdashdot',
                            zIndex : 3,
							label: {
								text: 'Unhealthy for Sensitive',
								x: 0,
								y: 15,
								style: {
                                    color: '#f0b641',
                                    fontWeight: 'bold'
                                }
							}
						}, {
							
							value: 150,
							color: '#f04141',
							width: 3,
							dashStyle: 'longdashdot',
                            zIndex : 3,
							label: {
								text: 'Unhealthy',
								x: 0,
								y: 15,
								style: {
                                    color: '#f04141',
                                    fontWeight: 'bold'
                                }

							}
						}, {
						
							value: 250,
							color: '#7D2181',
							width: 3,
							dashStyle: 'longdashdot',
                            zIndex : 3,
							label: {
								text: 'Very Unhealthy',
								x: 0,
								y: 15,
								style: {
                                    color: '#7D2181',
                                    fontWeight: 'bold'
                                }

							}
								
						}],
	 
			 
			 title: {
			  text: 'PM2.5' + unitsPM
			 },

			 height: '60%',
			 lineWidth: 2,
			 resize: {
				enabled: true
			 },	
			},{
			labels: {
				align: 'right',
				x: -3
			},

			title: {
			 text: 'CO2 (ppm)'
			},
			top: '65%',
			height: '35%',
			offset: 0,
			lineWidth: 2
			}],
    tooltip: {
      valueDecimals: 2,
     /* xDateFormat: '%Y-%m-%d %H:%M:%S', // Format the tooltip date/time */
      xDateFormat: '%m-%d-%Y %H:%M:%S', // Format the tooltip date/time
    },
    navigator: {
				adaptToUpdatedData: false,
				series: {
							id: 'navigator',
							data: chartData1
						}
				},
    series: [{
      name: 'PM2.5',
      type: 'line',
      data: chartData1,
      dataGrouping: {
		 units: groupingUnits
	  },	
      point: {
        events: {
          mouseOver: function () {
            const correspondingMarker = markers1[this.index];
            if (correspondingMarker) {
              correspondingMarker.setAnimation(google.maps.Animation.BOUNCE);
            }
          },
          mouseOut: function () {
            const correspondingMarker = markers1[this.index];
            if (correspondingMarker) {
               correspondingMarker.setAnimation(null);
            }
          }
        }
      }
    },
       {
		type: 'line',
		name: 'CO2',
		data: chartData2,
		yAxis: 1,
		dataGrouping: {
		 units: groupingUnits
		}
    }]  
    
  }); // highcharts
  
   // Assuming button with id 'export-current-session'
    const exportBtn = document.getElementById('export-current-session');
    exportBtn.setAttribute('data-session-id', sessionId); // Store sessionId for later use
    currentDeviceName = m_device;
    // Directly attach the event listener
    exportBtn.onclick = exportSessionDataToCSV; // This will overwrite any previous onclick handler
    
    document.getElementById('close-chart').addEventListener('click', function() {
            document.getElementById('chart-area').style.display = 'none';
    });
}

function formatDate(dateString) {
    let formattedDate;

    // Handle both "YYYY-MM-DD HH:MM:SS -0800" and "YYYY-MM-DDTHH:MM:SS-08:00" formats
    if (dateString.includes('T')) {
        // For ISO 8601 format (e.g., 2022-09-16T18:39:49-08:00)
        const date = new Date(dateString);
        // Ensure month, day, hours, minutes, and seconds have leading zeros if necessary
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);
        // Format to "m-dd-yy hh:mm:ss"
        formattedDate = `${month}-${day}-${date.getFullYear().toString().slice(-2)} ${hours}:${minutes}:${seconds}`;
    } else {
        // For the other format (e.g., 2024-03-17 17:18:43 -0800)
        const [datePart, timePart] = dateString.split(' ');
        const [year, month, day] = datePart.split('-');
        // Ensure month and day have leading zeros if necessary
        const formattedMonth = ('0' + parseInt(month)).slice(-2);
        const formattedDay = ('0' + day).slice(-2);
        const shortYear = year.slice(-2);
        // Omit timezone information and reformat to "m-dd-yy hh:mm:ss"
        formattedDate = `${formattedMonth}-${formattedDay}-${shortYear} ${timePart}`;
    }

    return formattedDate;
}

function exportSessionDataToCSV(m_device) {
    const exportBtn = document.getElementById('export-current-session');
    const sessionId = exportBtn.getAttribute('data-session-id');

    // Ensure sessionId is treated as a string or the correct type as stored in parsedData
    console.log("Exporting data for Session ID:", sessionId);
    
    console.log(JSON.stringify(parsedData));
    let sessionId1 = String(sessionId);
    
    if (isLegacy) {
      if (sessionId == '1'){ // check for legacy "userId"
         sessionId1 = 'xxxxxxxxxx';
      }
      if (sessionId == '99') { // more legacy
         sessionId1 = 'START';
      }
      if (sessionId == '100') { // more legacy
         sessionId1 = 'STOP';
      }
	}
    // Filter parsedData for the current sessionId
    const sessionData = parsedData.filter(row => String(row['field1']) === sessionId1);

    if (sessionData.length === 0) {
        console.error("No data found for session ID:", sessionId);
        return; // Exit if no data is found to avoid errors
    }

    console.log("Data found for session:", sessionData.length, "entries");
    
    // Convert all UTC date strings in sessionData to local time strings
    sessionData.forEach(data => {
        const localTime = new Date(data['created_at']);
        data['created_at'] = localTime.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    });

    // Convert filtered data back into CSV
    const csv = Papa.unparse(sessionData);

    if (!csv) {
        console.error("Failed to generate CSV data.");
        return; // Exit if CSV data is empty
    }
   
    var formattedCSV = JSON.stringify(csv, null, 2);

	// substitute proper BackpAQ header names for ThingSpeak field names for exported CSV 
		var mapObj = {
		created_at: "Time Stamp",
		entry_id:   "Meas ID",
		field1: "Session",
		field2: "Latitude (Deg)",
		field3: "Longitude (Deg)",
		field4: "PM2.5 (ug/m3)",
		field5: "Trackname",
		field6: "iconURL",
		field7: "CO2 (ppm)",
		field8: "Comments",
		latitude: "SPL (dBA)",
		longitude:"SPL (dBC)",
		elevation: "SPL (dBZ)",
		status: "BackpAQ Dev"
		};
			
	const data2 = formattedCSV.replace(/created_at|entry_id|field1|field2|field3|field4|field5|field6|field7|field8|latitude|longitude|elevation|status/gi, function(matched) {
	  return mapObj[matched];
	});	
	
	const csv2 = JSON.parse(data2); console.log(csv2);
       
    // Generate a unique filename using device, sessionId, and timeStart
    const representativeRow = sessionData[0];
    var device = ' ';
    console.log("Rep Row: " + JSON.stringify(representativeRow));
    if (isLegacy){
    	device = currentDeviceName; // legacy "device"
    	console.log("legacy device: " + JSON.stringify(device));
    } else {
        device = representativeRow['status']; // device
        console.log("device: " + JSON.stringify(device));
	}
    const timeStart = new Date(representativeRow['created_at']).toISOString();

    /* Remove undesirable characters from the date string (e.g., spaces, colons, dashes)
    const timeStartFormatted = timeStart.replace(/[\s:-]/g, '').slice(0, 15); // Include only date and time
    const filename = `Session_${device}_${sessionId}_${timeStartFormatted}.csv`;
    */
    
    // Convert UTC date string to local time string
    const localDate = new Date(representativeRow['created_at']);
    const formattedDate = localDate.toLocaleString('en-US').replace(/[\s,:]/g, '_').replace(/\//g, '-');
    const filename = `Session_${device}_${sessionId}_${formattedDate}.csv`;

    console.log("Filename for the exported CSV:", filename);

    // Create a Blob from the CSV String
    const blob = new Blob([csv2], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up after download
}

  
function pickDate(m_device, channelNumb, channelKy) {
	
     
    $(function() {
        const startDate = moment().subtract(3, 'months').startOf('day'); // 3 months ago
        const endDate = moment().endOf('day'); // Today

        $('input[name="daterange1"]').daterangepicker({
            opens: 'left',
            drops: 'down',
            timePicker: true,
            startDate: startDate,
            endDate: endDate,
            ranges: {
                'Last 3 Months': [moment().subtract(3, 'months').startOf('day'), moment().endOf('day')],
                'Today': [moment().startOf('day'), moment().endOf('day')],
                'Yesterday': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            },
        }, function(start, end, label) {
            // Formatting for your fetchSessionsData function
            const startTrackDate = start.format('YYYY-MM-DD HH:mm:ss');
            const endTrackDate = end.format('YYYY-MM-DD HH:mm:ss');
           
            // Clear existing session boxes before fetching new data
            const sessionContainer = document.getElementById("session-container");
            sessionContainer.innerHTML = '';
           
            const communityUrl = "https://api.thingspeak.com/channels/" + channelNumb + "/feeds.csv?location=true&api_key=" + channelKy +  "&status=true &results=2000 "; // Update this with your actual URL
            fetchSessionsData(m_device, communityUrl, startTrackDate, endTrackDate)
                .then(filteredSessions => {  	
                    addSessionBoxes(filteredSessions); 
                });
        });
     
         // Clear existing session boxes before fetching new data
        const sessionContainer = document.getElementById("session-container");
        sessionContainer.innerHTML = '';
        
        // Initially fetch and display sessions for the past month
        
        const startDat = moment().subtract(6, 'months').startOf('day'); // 1/2 year
        const endDat = moment().endOf('day'); // Today
        
         const communityUrl = "https://api.thingspeak.com/channels/" + channelNumb + "/feeds.csv?location=true&api_key=" + channelKy +  "&status=true &results=8000 "; 
         fetchSessionsData(m_device, communityUrl, startDat, endDat) // no dates/times for now
            .then(sessions => {
                 addSessionBoxes(sessions);     
            });
    });
}

function setupDragAndDrop() {
    const mapContainer = document.getElementById('container'); // Replace 'map' with the ID of your map container

    // Prevent default behavior (Prevent file from being opened)
    mapContainer.addEventListener('dragover', (event) => {
        event.stopPropagation();
        event.preventDefault();
        // Highlight potential drop target when the draggable element enters it
        event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
         mapContainer.classList.add('highlight'); // Add highlight effect
    });

    mapContainer.addEventListener('drop', (event) => {
        event.stopPropagation();
        event.preventDefault();
         mapContainer.classList.remove('highlight'); // Remove highlight effect once file is dropped

        const files = event.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            processCSVFile(file);
        }
    });
}

function processCSVFile(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        const text = event.target.result;
        const m_device = '';
        // Now process the CSV text
       
        parseAndDisplayCSVData(m_device, text);
    };
    reader.readAsText(file);
}