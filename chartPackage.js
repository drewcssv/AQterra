	// display sound spectrum chart from BackpAQ sensor
		function createSpectrumChart(index) {

			channelKy = markers[index][7]; // read key
			var sensorName = markers[index][1]; // backpaq or PA device name
			var sensorTyp = markers[index][2]; // sensor type - PurpleAir, BackpAQ, Met, etc.
			var sensorLoc = markers[index][3]; // location (may not be current)
			//var timeStamp = 

			StartDate = "2019-01-01%2009:00:00";
			EndDate = "2019-12-30%2009:00:00";
			sensorType = "SD";
			channelNumb = channelKeys[index].channelNumber;
			channelNumb = channelNumb.replace(/\s/g, ''); // squeeze out spaces     

			document.getElementById("graph-container").style.display = "inline";

			spectrumChart( index, sensorName, sensorType, channelNumb, channelKy); // get data and create sound spectrum chart

		}

		// display sound level chart from BackpAQ sensor
		function createSplChart(index) {

			channelKy = markers[index][7]; // read key
			var sensorName = markers[index][1]; // backpaq or PA device name
			var sensorTyp = markers[index][2]; // sensor type - PurpleAir, BackpAQ, Met, etc.
			var sensorLoc = markers[index][3]; // location (may not be current)

			StartDate = "2021-01-01%2009:00:00";
			EndDate = "2022-12-30%2009:00:00";
			sensorType = "SD";
			channelNumb = channelKeys[index].channelNumber;
			channelNumb = channelNumb.replace(/\s/g, ''); // squeeze out spaces     

			document.getElementById("graph-container").style.display = "inline";

			splChart(sensorName, sensorType, channelNumb, channelKy); // get data and create sound spectrum chart

		}
		
		// display Wind Barb chart Met sensor
		function createMetChartB(index) {

			channelKy = markers[index][7]; // read key
			var sensorName = markers[index][1]; // backpaq or PA device name
			var sensorTyp = markers[index][2]; // sensor type - PurpleAir, BackpAQ, Met, etc.
			var sensorLoc = markers[index][3]; // location (may not be current)

			metStartDate = "2019-01-01%2009:00:00";
			metEndDate = "2019-12-30%2009:00:00";
			sensorType = "MT";
			channelNumb = channelKeys[index].channelNumber;
			channelNumb = channelNumb.replace(/\s/g, ''); // squeeze out spaces     

			document.getElementById("graph-container").style.display = "inline";
			wbChart(sensorName, sensorType, channelNumb, channelKy); // get data and create windbarb chart

		}

		// display wind Rose chart for Met sensor
		function createMetChartR(index) {

			channelKy = markers[index][7]; // read key
			var sensorName = markers[index][1]; // backpaq or PA device name
			var sensorTyp = markers[index][2]; // sensor type - PurpleAir, BackpAQ, Met, etc.
			var sensorLoc = markers[index][3]; // location (may not be current)


			metStartDate = "2019-01-01%2009:00:00";
			metEndDate = "2019-12-30%2009:00:00";
			sensorType = "MT";
			channelNumb = channelKeys[index].channelNumber;
			channelNumb = channelNumb.replace(/\s/g, ''); // squeeze out spaces     


			document.getElementById("graph-container").style.display = "inline";
			wrChart(sensorName, sensorType, channelNumb, channelKy); // get data and create windrose chart

		}


		// display small chart with data for THIS sensor
		function createNewSmallChart(index) {

			channelKy = markers[index][7]; // read key
			var sensorName = markers[index][1]; // backpaq or PA device name
			var sensorTyp = markers[index][2]; // sensor type - PurpleAir, BackpAQ, Met, etc.
			var sensorLoc = markers[index][3]; // location (may not be current)


			if (markers[index][2].indexOf("PurpleAir") >= 0) { // PURPLE AIR
				start = "2022-01-01%2009:00:00";
				end = "2024-12-30%2009:00:00";
				sensorType = "PA";
				channelNumb = channelKeys[index].channelNumber;
				channelNumb = channelNumb.replace(/\s/g, ''); // squeeze out spaces 

				document.getElementById("graph-container").style.display = "inline";
				hChart(sensorName, sensorType, channelNumb, channelKy); // get data and create chart

			} else if (markers[index][2].indexOf("BackpAQ") >= 0) // BACKPAQ

			{
				start = "2022-12-01%2009:00:00";
				end = "2024-12-31%2009:00:00";
				sensorType = "BP";
				channelNumb = channelKeys[index].channelNumber;
				channelNumb = channelNumb.replace(/\s/g, ''); // squeeze out spaces 

				document.getElementById("graph-container").style.display = "inline";
				hChart2(sensorName, sensorType, channelNumb, channelKy); // get data and create chart
				

			} else if (markers[index][2].indexOf("Met") >= 0) // MET

			{
				metStartDate = "2019-01-01%2009:00:00";
				metEndDate = "2019-12-30%2009:00:00";
				sensorType = "MT";
				channelNumb = channelKeys[index].channelNumber;
				channelNumb = channelNumb.replace(/\s/g, ''); // squeeze out spaces     

				//alert(typeOfChart);
				if (typeOfChart == "wb") {
					document.getElementById("graph-container").style.display = "inline";
					wbChart(sensorName, sensorType, channelNumb, channelKy); // get data and create windbarb chart
				} else {
					document.getElementById("graph-container").style.display = "inline";
					wrChart(sensorName, sensorType, channelNumb, channelKy); // get data and create windrose chart
				}
			} else if (markers[index][2].indexOf("Vaisala") >= 0)

			{
				document.getElementById("graph-container").style.display = "inline";

				// fetch vaisala data for NO2, CO, SO2, O3
				var datavalue, datanav, datacomp;
				$.when(
					$.getJSON("https://beacon.vaisala.com/dbe.php?device_id=729&type_id=1&hash=aa07830bf9f74f815d11c351dca857dda5341a2602ea022b07739b53c1b714cf0783bfe6b3aafb8f114a24766a4ed14f688e81849b84755284eae5f364e4ce69&init=2&callback=?", function(data) {
						datanav = data;

					}),
					$.getJSON("https://beacon.vaisala.com/dbe.php?device_id=729&type_id=1&hash=aa07830bf9f74f815d11c351dca857dda5341a2602ea022b07739b53c1b714cf0783bfe6b3aafb8f114a24766a4ed14f688e81849b84755284eae5f364e4ce69&init=1&callback=?", function(data) {
						datavalue = data;

					}),
					$.getJSON("https://beacon.vaisala.com/dbe.php?device_id=729&type_id=3&hash=aa07830bf9f74f815d11c351dca857dda5341a2602ea022b07739b53c1b714cf0783bfe6b3aafb8f114a24766a4ed14f688e81849b84755284eae5f364e4ce69&init=1&callback=?", function(data) {
						datacomp = data;

					}),

					$.getJSON("https://beacon.vaisala.com/dbe.php?device_id=729&type_id=6&hash=aa07830bf9f74f815d11c351dca857dda5341a2602ea022b07739b53c1b714cf0783bfe6b3aafb8f114a24766a4ed14f688e81849b84755284eae5f364e4ce69&init=1&callback=?", function(data) {
						datacomp1 = data;

					})

				).then(function() {

					// create the chart
					$('graph-container').highcharts('StockChart', {
						credits: {
							enabled: false
						},
						chart: {
							type: 'line',
							zoomType: 'x'
						},
						navigator: {
							adaptToUpdatedData: false,
							series: {
								id: 'navigator',
								data: datanav
							}
						},
						scrollbar: {
							liveRedraw: false
						},
						rangeSelector: {

							buttonSpacing: 1,
							buttons: [{
								type: 'day',
								count: 1,
								text: '1 day'
							}, {
								type: 'month',
								count: 1,
								text: '1 month'
							}, {
								type: 'year',
								count: 1,
								text: '1 year'
							}, {
								type: 'all',
								text: 'All'
							}],
							inputEnabled: true, // it supports only days
							selected: 0, // day

							buttonTheme: { // styles for the buttons
								width: 55,
								style: {
									'font-size': '0.875rem',
									fontWeight: '400',
								},
								states: {
									hover: {
										fill: '#00b5d3',
										style: {
											color: '#ffffff'
										},
									},
									select: {
										fill: '#009ac8',
										style: {
											color: '#ffffff'
										},
									},
									disabled: {
										fill: '#ececec',
										style: {
											color: '#b5b5b5'
										},
									},
								}
							},
						},
						title: {
							text: markers[index][1]
						},
						xAxis: {
							events: {
								afterSetExtremes: afterSetExtremes
							},
							minRange: 3600 * 1000 // one hour
						},
						series: [{
								name: 'NO2 (ppm)',
								data: datavalue,
								dataGrouping: {
									enabled: false
								}
							},
							{
								name: 'SO2 (ppm)',
								data: datacomp,
								dataGrouping: {
									enabled: false
								}
							},
							{
								name: 'O3 (ppm)',
								data: datacomp1,
								dataGrouping: {
									enabled: false
								}
							}
						]
					});
				});
			} // else
		}

		function afterSetExtremes(e) {

			var url,
				currentExtremes = this.getExtremes(),
				range = e.max - e.min;
			var chart = $('#graph-container').highcharts();
			chart.showLoading('Loading data from server, please wait...');
			// alert("in set extremes...");

			$.when(
				$.getJSON("https://beacon.vaisala.com/dbe.php?device_id=729&hash=aa07830bf9f74f815d11c351dca857dda5341a2602ea022b07739b53c1b714cf0783bfe6b3aafb8f114a24766a4ed14f688e81849b84755284eae5f364e4ce69&type_id=1&start=" + Math.round(e.min) +
					'&end=' + Math.round(e.max) + '&callback=?',
					function(data) {

						chart.series[0].setData(data);
						chart.hideLoading();
					}),
				$.getJSON("https://beacon.vaisala.com/dbe.php?device_id=729&hash=aa07830bf9f74f815d11c351dca857dda5341a2602ea022b07739b53c1b714cf0783bfe6b3aafb8f114a24766a4ed14f688e81849b84755284eae5f364e4ce69&type_id=2&start=" + Math.round(e.min) +
					'&end=' + Math.round(e.max) + '&callback=?',
					function(data) {

						chart.series[1].setData(data);
						chart.hideLoading();
					}),
				$.getJSON("https://beacon.vaisala.com/dbe.php?device_id=729&hash=aa07830bf9f74f815d11c351dca857dda5341a2602ea022b07739b53c1b714cf0783bfe6b3aafb8f114a24766a4ed14f688e81849b84755284eae5f364e4ce69&type_id=6&start=" + Math.round(e.min) +
					'&end=' + Math.round(e.max) + '&callback=?',
					function(data) {

						chart.series[2].setData(data);
						chart.hideLoading();
					})
			).then(function() {
				//alert("finished set extremes...");
			});
		}

		function makeChart(TScommand) {
			document.getElementById('info_map').style.display = "inline";

			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4) {
					document.getElementById('info_map').value += "<br><br>" + this.responseText;
				};
				xhttp.open('GET', TScommand, false);
				xhttp.send();

			};
		}

		function hChart2(sensorName, sensorType, channelNumb, channelKy) {

			var feeds1 = [],
				feeds2 = [],
				times = [],
				times2 = [];
			var feedsCO2 = [];
			var avgString = " ";
			var timez = '&timezone=America/Los_Angeles';

			if (pmAverage == "Daily") {
				avgString = " Average: Daily";
			} else if (pmAverage == "60") {
				avgString = " Average: 1 Hour";
			} else if (pmAverage == "10") {
				avgString = " Average: 10 minutes";
			} else if (pmAverage == "realtime") {
				avgString = " Realtime";
			}
		
		    // alert("Starting Date: " + start + " End date: " + end);
		
			
			// Highcharts.getJSON('https://demo-live-data.highcharts.com/aapl-ohlcv.json', function (data) {

				$.getJSON("https://api.thingspeak.com/channels/" + channelNumb + "/feeds.json?location=true&api_key=" + channelKy +  "&results=8000" + "&start=" + start + "&end=" + end  + timez + tsAvg , function(data) {

				dataLength = data.feeds.length;
				for (var counter = 0; counter < dataLength; counter++) {
					// parse data
					newVal = parseFloat(data.feeds[counter].field2);
					var newCO2 = parseFloat(data.feeds[counter].field8);
					timeDate = parseInt(data.feeds[counter].created_at);

					var time = (new Date(data.feeds[counter].created_at)).getTime();
					
					//var time = (new Date(data.feeds[counter].created_at)).toTimeString();

					// build data arrays
					feeds2.push([time, newVal]);
					feedsCO2.push([time, newCO2]);
					times.push(time);

				} // for
				

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
	
				
				// redefine reset to help tooltip stay focused
			//	Highcharts.Pointer.prototype.reset = function() {
            //      return undefined;
            //    };
            
            
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
				
             // create the chart
				$('#graph-container').highcharts('StockChart', {
				
					rangeSelector: {
						selected: 1
					},
				   chart: {
					
					events: {
                       load: function() {	
						
                         var chart = this;
                         chart.renderer.image('https://www.backpaqlabs.com/images/close-button-png-30241.png', 65, 15, 20, 20)
                         .on('click', function() {
                         //  alert('Button clicked!')
						   	   // the button handler       
                         //  chart.destroy();
						   document.getElementById("graph-container").style.display = "none";
						   clearInterval(chart_intervalID); // clear refresh interval
						   doRefresh = false;
                           })
                         .add();
						 
						 //showLastPointTooltip(chart);
						
						// var point = $(this.series[0].tooltipPoints).last();
                       //   point.select();
                       //   $(this)[0].tooltip.refresh(point); 
						 		
                         // set up the updating of the chart each interval
						//  var series = chart.series[0];
                         var series0 = this.series[0];
					     var series1 = this.series[1];		
									  
						 var dataRefreshRate = 0;
						 // test for live data
						 if (doRefresh)  {	 
						      dataRefreshRate = 30000;
							  alert("Live Data!");
							  liveDataString = '<span style="color: red">Live Data</span>';
						  
                            chart_intervalID = setInterval(function () {
								
						$.getJSON("https://api.thingspeak.com/channels/" + channelNumb + "/feeds.json?location=true&api_key=" + channelKy + "&start=" + start + "&end=" + end + "&results=2500" + timez + tsAvg, function(data) {

				          dataLength = data.feeds.length;
			        	  for (var counter = 0; counter < dataLength; counter++) {
					      // parse data
				        	newVal = parseFloat(data.feeds[counter].field2);
				     	    var newCO2 = parseFloat(data.feeds[counter].field8);
				    	    timeDate = parseInt(data.feeds[counter].created_at);

				    	    var time = (new Date(data.feeds[counter].created_at)).getTime();
					
				    	   //var time = (new Date(data.feeds[counter].created_at)).toTimeString();

				    	    // build data arrays
				    	    feeds2.push([time, newVal]);
				    	    feedsCO2.push([time, newCO2]);
				     	    times.push(time);

				           } // for	
							
						    shift = false;	  
							series0.addPoint([time, newVal], true, shift);
                            series1.addPoint([time, newCO2], true, shift);				
							    						 
						}); // getJSON	 
							 
                          }, dataRefreshRate); // 30 second interval 
						
					   } else // no live data
						   {			 
							 liveDataString = "";
						   }
                      } // load Function
				     } // events
				   },  // chart
                   time: {
                       timezone: 'America/Los_Angeles'
                    },

					title: {
						text: sensorName + ': PM2.5, CO2' + " " + pmCorrection + "<br>" + avgString + "   " + liveDataString
					},

					yAxis: [{
						labels: {
							align: 'right',
							x: -3
						},
						title: {
							text: 'PM2.5' + unitsPM
						},

						height: '60%',
						lineWidth: 2,
						resize: {
							enabled: true
						},

						plotLines: [{
	
							value: 50,
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
							
							value: 100,
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
							
							value: 150,
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
							
							value: 200,
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
						
							value: 300,
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
								
						}]

					}, {

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
					}, {

						labels: {
							align: 'right',
							x: -3
						}

					}],

					tooltip: {
						split: true,
						zIndex: 1,
                       color: '#FF3333',
                       negativeColor: '#48AFE8'
					},
					
					 responsive: {
                        rules: [{
                           condition: {
                             maxWidth: 800
                           },
              
                        }]
                    },

					series: [{
						type: 'line',
						name: 'PM2.5',
						data: feeds2,
						dataGrouping: {
							units: groupingUnits
						}
					}, {
						type: 'line',
						name: 'CO2',
						data: feedsCO2,
						yAxis: 1,
						dataGrouping: {
							units: groupingUnits
						}
					}]
				});
			});

		 
			
		} // hchart2
		
	function showLastPointTooltip(objHighStockchart){
    // show tooltip for last point   
    var points=[];
    if(objHighStockchart)
     {
        for(var i=0;i<objHighStockchart.series.length;i++)
 
                points.push(objHighStockchart.series[i].points[objHighStockchart.series[i].points.length-1]);
        
    
            objHighStockchart.tooltip.refresh(points);
        
        
      }
   }

		function hChart(sensorName, sensorType, channelNumb, channelKy) {

			var feeds1 = [],
				feeds2 = [],
				times = [],
				times2 = [];
			var feedsCO2 = [];
			var avgString = "";
			var timez = '&timezone=America/Los_Angeles';
			if (pmAverage == "Daily") {
				avgString = " Average: Daily";
			} else if (pmAverage == "10") {
				avgString = " Average: 10 minutes";
			} else if (pmAverage == "60") {
				avgString = " Average: 1 Hour";
			} else if (pmAverage == "realtime") {
				avgString = " Realtime";
			}

			$.when(
				// $.getJSON("https://api.thingspeak.com/channels/" + channelNumb+ "/fields/2.json?location=true&api_key=" + channelKy+ "&start=" + start+ "&end="+end+"&results=2500", function (data) {
				$.getJSON("https://api.thingspeak.com/channels/" + channelNumb + "/feeds.json?location=true&api_key=" + channelKy + "&start=" + start + "&end=" + end + "&results=2500" + timez + tsAvg, function(data) {

					dataLength = data.feeds.length;
					for (var counter = 0; counter < dataLength; counter++) {

						newVal = parseFloat(data.feeds[counter].field2);
						var newCO2 = parseFloat(data.feeds[counter].field8);
						timeDate = parseInt(data.feeds[counter].created_at);

						var time = (new Date(data.feeds[counter].created_at)).getTime();

						// console.log(time);
						feeds2.push([time, newVal]);
						feedsCO2.push([time, newCO2]);
						times.push(time);

					} // for

				}), // getJSON

				$.getJSON("https://api.thingspeak.com/channels/" + channelNumb + "/fields/1.json?location=true&api_key=" + channelKy + "&start=" + start + "&end=" + end + "&results=2500" + timez + tsAvg, function(data) {

					dataLength = data.feeds.length;
					for (var counter = 0; counter < dataLength; counter++) {

						newVal = parseFloat(data.feeds[counter].field1);
						timeDate = parseInt(data.feeds[counter].created_at);

						var time = (new Date(data.feeds[counter].created_at)).getTime();

						// console.log(time);
						feeds1.push([time, newVal]);
						times.push(time);

					} // for

				}), // getJSON

				$.getJSON("https://api.thingspeak.com/channels/" + channelNumb + "/fields/3.json?location=true&api_key=" + channelKy + "&start=" + start + "&end=" + end + "&results=2500" + timez + tsAvg, function(data) {

					dataLength = data.feeds.length;
					for (var counter = 0; counter < dataLength; counter++) {

						newVal = parseFloat(data.feeds[counter].field3);
						timeDate = parseInt(data.feeds[counter].created_at);

						var time = (new Date(data.feeds[counter].created_at)).getTime();

						// console.log(time);
						feeds3.push([time, newVal]);
						times.push(time);

					} // for

				}) // getJSON

			).then(function() {

			    (function(H) {
                   H.Pointer.prototype.drag = function(e) {
   		             var container = this.chart.container.parentElement;
                  //  container.style.left = container.offsetLeft + e.movementX + 'px';
                     container.style.top = container.offsetTop + e.movementY + 'px'; // only allow up/down movement so that pan-zoom works
                   }
                 })(Highcharts);
				
				// create the chart
				$('#graph-container').highcharts('StockChart', {
					credits: {
						enabled: false
					},
					 time: {
                       timezone: 'America/Los_Angeles'
                    },
					chart: {
						type: 'line',
						zoomType: 'x',		
					    events: {
                          load: function() {
                           var chart = this;
                           chart.renderer.image('https://www.backpaqlabs.com/images/close-button-png-30241.png', 65, 15, 20, 20)
                             .on('click', function() {
                           //  alert('Button clicked!')
							 document.getElementById("graph-container").style.display = "none";
                            })
                           .add();
                          }
                       }	
					},
					navigator: {
						adaptToUpdatedData: false,
						series: {
							id: 'navigator',
							data: feeds2
						}
					},
					scrollbar: {
						liveRedraw: false
					},
					rangeSelector: {

						buttonSpacing: 1,
						buttons: [{
							type: 'day',
							count: 1,
							text: '1 day'
						}, {
							type: 'month',
							count: 1,
							text: '1 month'
						}, {
							type: 'year',
							count: 1,
							text: '1 year'
						}, {
							type: 'all',
							text: 'All'
						}],
						inputEnabled: true, // it supports only days
						selected: 0, // day

						buttonTheme: { // styles for the buttons
							width: 55,
							style: {
								'font-size': '0.875rem',
								fontWeight: '400',
							},
							states: {
								hover: {
									fill: '#00b5d3',
									style: {
										color: '#ffffff'
									},
								},
								select: {
									fill: '#009ac8',
									style: {
										color: '#ffffff'
									},
								},
								disabled: {
									fill: '#ececec',
									style: {
										color: '#b5b5b5'
									},
								},
							}
						},
					},
					title: {
						text: sensorName + " " + pmCorrection + "<br>" + avgString
					},
					xAxis: {
						type: 'datetime',
						events: {
							afterSetExtremes: afterSetExtremes1
						},
						minRange: 3600 * 1000 // one hour
					},
					yAxis: {

						title: {
							text: 'PM2.5 (µg/m3") '
						},

						plotBands: [{

							from: 0,
							to: 12,
							color: 'rgba(0,255,0,.2)',
							label: {
								text: 'Good'
							}
						}, {
							from: 12.1,
							to: 21.0,
							color: 'rgba(255, 50,0, .2)',
							label: {
								text: 'Moderate'
							}
						}, {
							from: 21.1,
							to: 35.4,
							color: 'rgba(255, 10,0, .2)',
							label: {
								text: 'Unhealthy for Sensitive'
							}
						}, {
							from: 35.5,
							to: 55.4,
							color: 'rgba(255, 0, 0, .2)',
							label: {
								text: 'Unhealthy'
							}
						}, {
							from: 55.5,
							to: 150.4,
							color: 'rgba(128,0,128 .2)',
							label: {
								text: 'Very Unhealthy'
							}
						}, {
							from: 150.5,
							to: 250.4,
							color: 'rgba(255, 0, 10, .2)',
							label: {
								text: 'Hazardous'
							}
						}, {
							from: 250.5,
							to: 350.4,
							color: 'rgba(255, 0, 10, .2)',
							label: {
								text: 'Hazardous'
							}
						}, {
							from: 350.5,
							to: 500.4,
							color: 'rgba(255, 0, 10, .2)',
							label: {
								text: 'Hazardous'
							}
						}]

					},
					series: [{
							name: 'PM2.5' + unitsPM,
							data: feeds2,
							dataGrouping: {
								enabled: false
							}

						},
						{
							name: 'PM1.0' + unitsPM,
							data: feeds1,
							dataGrouping: {
								enabled: false
							}
						},
						{
							name: 'PM10' + unitsPM,
							data: feeds3,
							dataGrouping: {
								enabled: false
							}
						}
					]
				});
			});
		}

		function afterSetExtremes1(e) {

			var url,
				currentExtremes = this.getExtremes(),
				range = e.max - e.min;
			var chart = $('#graph-container').highcharts();
			var timez = '&timezone=America/Los_Angeles';
			chart.showLoading('Loading data from server, please wait...');

			$.when(
				$.getJSON("https://api.thingspeak.com/channels/" + channelNumb + "/fields/2.json?location=true&api_key=" + channelKy + "&start=" + start + "&end=" + end + "&results=2500" + timez + tsAvg, function(data) {

					dataLength = data.feeds.length;
					for (var counter = 0; counter < dataLength; counter++) {

						newVal = parseFloat(data.feeds[counter].field2);
						timeDate = parseInt(data.feeds[counter].created_at);

						var time = (new Date(data.feeds[counter].created_at)).getTime();

						// console.log(time);
						feeds2.push([time, newVal]);
						times.push(time);
					}
					chart.series[0].setData(feeds2);
					chart.hideLoading();
				}),

				$.getJSON("https://api.thingspeak.com/channels/" + channelNumb + "/fields/1.json?location=true&api_key=" + channelKy + "&start=" + start + "&end=" + end + "&results=2500" + timez + tsAvg, function(data) {

					dataLength = data.feeds.length;
					for (var counter = 0; counter < dataLength; counter++) {

						newVal = parseFloat(data.feeds[counter].field1);
						timeDate = parseInt(data.feeds[counter].created_at);

						var time = (new Date(data.feeds[counter].created_at)).getTime();

						// console.log(time);
						feeds1.push([time, newVal]);
						times.push(time);
					}
					chart.series[1].setData(feeds1);
					chart.hideLoading();
				})

			).then(function() {

			});
		}

		// plot wind barbs for met sensor data
		function wbChart(sensorName, sensorType, channelNumb, channelKy) {

			var feeds1 = [],
				feeds2 = [],
				times = [],
				times2 = [];
			var dirArray = [];
			StartDate = "2019-01-01%2009:00:00";
			EndDate = "2019-12-30%2009:00:00";
			// metStartDate and metEndDate are global vars

			$.when(

				// get wind direction, speed
				$.getJSON("https://api.thingspeak.com/channels/" + channelNumb + "/feeds.json?location=true&api_key=" + channelKy + "&start=" + StartDate + "&end=" + EndDate + "&results=500", function(data) {

					dataLength = data.feeds.length;
					for (var counter = 0; counter < dataLength; counter++) {

						dirVal = parseFloat(data.feeds[counter].field2); // fetch wind direction
						speedVal = parseFloat(data.feeds[counter].field4); // fetch wind speed

						timeDate = parseInt(data.feeds[counter].created_at);

						var time = (new Date(data.feeds[counter].created_at)).getTime();

						feeds1.push([time, speedVal]); // array contains time and wind speed
						feeds2.push([time, dirVal]); // array contains time and wind direction

						times.push(time);

						wbData.push([speedVal, dirVal]); // build data array with wind speed, direction

					} // for
				}), // getJSON          

			).then(function() {

				metStartDate = Date.parse("01-01-2019"),

					Highcharts.chart('graph-container', {
						title: {
							text: sensorName + ' Sensor Wind Barbs'
						},
				    	 time: {
                           timezone: 'America/Los_Angeles'
                        },
						xAxis: {
							type: 'datetime',
							offset: 40
						},
						yAxis: {
							title: {
								text: "m/s"
							}
						},
						plotOptions: {
							series: {
								pointStart: Date.UTC(2019, 1, 1),

								pointInterval: 36e5
							}
						},
						series: [{
							type: 'windbarb',
							data: wbData,
							name: 'Wind',
							color: Highcharts.getOptions().colors[1],
							showInLegend: false,
							tooltip: {
								valueSuffix: ' m/s'
							}
						}, {
							type: 'area',
							keys: ['y', 'rotation'], // rotation is not used here
							data: wbData, // note new data from ThingSpeak!
							color: Highcharts.getOptions().colors[0],
							fillColor: {
								linearGradient: {
									x1: 0,
									x2: 0,
									y1: 0,
									y2: 1
								},
								stops: [
									[0, Highcharts.getOptions().colors[0]],
									[
										1,
										Highcharts.color(Highcharts.getOptions().colors[0])
										.setOpacity(0.25).get()
									]
								]
							},
							name: 'Wind speed',
							tooltip: {
								valueSuffix: ' m/s'
							},
							states: {
								inactive: {
									opacity: 1
								}
							}
						}] // series
					}); // High
			}); // then
		} // wbChart

		// plot wind rose for met sensor data
		function wrChart(sensorName, sensorType, channelNumb, channelKy) {

			StartDate = "2019-01-01%2009:00:00";
			EndDate = "2019-12-30%2009:00:00";

			$.when(

				// get wind direction, speed
				$.getJSON("https://api.thingspeak.com/channels/" + channelNumb + "/feeds.json?location=true&api_key=" + channelKy + "&start=" + StartDate + "&end=" + EndDate + "&results=500", function(data) {

					dataLength = data.feeds.length;
					for (var counter = 0; counter < dataLength; counter++) {

						dirVal = parseFloat(data.feeds[counter].field2); // fetch wind direction
						speedVal = parseFloat(data.feeds[counter].field4); // fetch wind speed  

						windDataJSON.push([dirVal, speedVal]); // build data array with wind speed, direction          

					} // for

				}), // getJSON

			).then(function() {

				var categories = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

				$('#graph-container').highcharts({
					series: [{
						name: 'Wind Direction Frequency',
						data: windDataJSON
					}],
					chart: {
						polar: true,
						type: 'column'
					},
					title: {
						text: 'Met Sensor ' + '<b>' + '<span style="color: green">' + sensorName + '</span>' + '</b>' + ' Wind Rose'
					},
					subtitle: {
						text: 'Percent Calm: xx%'
					},
					pane: {
						size: '85%'
					},
					legend: {
						align: 'right',
						verticalAlign: 'top',
						y: 100,
						layout: 'vertical'
					},
					xAxis: {
						min: 0,
						max: 360,
						type: "",
						tickInterval: 22.5,
						tickmarkPlacement: 'on',
						labels: {
							formatter: function() {
								return categories[this.value / 22.5] + '°';
							}
						}
					},
					yAxis: {
						min: 0,
						endOnTick: false,
						showLastLabel: true,
						title: {
							text: 'Frequency (%)'
						},
						labels: {
							formatter: function() {
								return this.value + '%';
							}
						},
						reversedStacks: false
					},
					tooltip: {
						valueSuffix: '%'
					},
					plotOptions: {
						series: {
							stacking: 'normal',
							shadow: false,
							groupPadding: 0,
							pointPlacement: 'on'
						}
					}
				});
			});
		} // wrChart

		// Create a sound spectrum chart for channel sound data
		function spectrumChart(index, sensorName, sensorType, channelNumb, channelKy) {

        
			$.getJSON("https://api.thingspeak.com/channels/" + channelNumb + "/feeds/last.json?api_key=" + channelKy + "&status=true&location=true", function(result) {
				
                var options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
                 
				var timeStamp = result.created_at;
				var ts = new Date(timeStamp).toLocaleTimeString('en-us', options);
				//	console.log("timeStamp: " + ts);
					
				var aa = result.status; // spectrum array is packed in "status" field...tricky eh?
				//if ((aa != "") && (typeof(aa) != "undefined")) // make sure we HAVE data here
				if (!aa)
				  { console.log("No Spectrum data");}
				else
				  {
				    var data = JSON.parse(aa.replace(',]', ']')); // delete the trailing comma
					
				  }

				$('#graph-container').highcharts({
					//Highcharts.chart('container', {
					chart: {
						type: 'column',
						
					    events: {
                           load: function() {
                             var chart = this;
                              chart.renderer.image('https://www.backpaqlabs.com/images/close-button-png-30241.png', 65, 15, 20, 20)
                             .on('click', function() {
                             //  alert('Button clicked!')
							    document.getElementById("graph-container").style.display = "none";
                               })
                             .add();
                             }
                         }
					},
					title: {
						text: sensorName + '  Sound Spectrum on ' + ts
					},
					subtitle: {
						text: 'Sound Pressure Level Across 9 Octaves'
					},
					 time: {
                           timezone: 'America/Los_Angeles'
                        },
					xAxis: {
						categories: [
							'31',
							'63',
							'122',
							'250',
							'500',
							'1000',
							'2000',
							'4000',
							'8000'
						],
						crosshair: true
					},
					yAxis: {
						min: 0,
						title: {
							text: 'SPL(dB)'
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
						pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
							'<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: [{
						name: 'dB(A)',
						data: data
					}]
				});
			}) // getJSON
			
		
			
	}
		
		

		function splChart(sensorName, sensorType, channelNumb, channelKy) {

			
			var tsFeeds2 = '/last.json?status=true&metadata=true&location=true&elevation=true&api_key=';

			$.when(
							
				$.getJSON("https://api.thingspeak.com/channels/" + channelNumb + "/feeds.json?results=200&location=true&elevation=true&status=true&elevation=true&api_key=" + channelKy
						  , function(data) {
                 
				  // console.log(data);
			    dataLength = data.feeds.length;
				if (dataLength > 0)
					{
					for (var counter = 0; counter < dataLength; counter++) {
						// parse JSON data from ThingSpeak 
						var valA = parseFloat(data.feeds[counter].elevation); //console.log(ll + " DBA: " + noiseDBA[ll]);
						var valC = parseFloat(data.feeds[counter].latitude); // console.log(ll + " DBC: " + noiseDBC[ll]);
						var valZ = parseFloat(data.feeds[counter].longitude); // console.log(ll + " DBZ: " + noiseDBZ[ll]

						var timeDate = parseInt(data.feeds[counter].created_at);
						var time = (new Date(data.feeds[counter].created_at)).getTime();

						// push data into series arrays   
						noiseDBA.push([time, valA]);
						noiseDBC.push([time, valC]);
						noiseDBZ.push([time, valZ]);
						times.push(time);

					} // for
				   }
				else
				  { console.log("No data from SPL getJSON, channel = " + channelNumb); return;}
				}) // getJSON

			).then(function() {

				// create the chart
				$('#graph-container').highcharts('StockChart', {
					credits: {
						enabled: false
					},
					chart: {
						type: 'line',
						zoomType: 'x',		
					
					    events: {
                          load: function() {
                            var chart = this;
                            chart.renderer.image('https://www.backpaqlabs.com/images/close-button-png-30241.png', 65, 15, 20, 20)
                            .on('click', function() {
                             // alert('Button clicked!')
							   document.getElementById("graph-container").style.display = "none";
                              })
                             .add();
                           }
                        }	
					},
					 time: {
                           timezone: 'America/Los_Angeles'
                        },
					navigator: {
						adaptToUpdatedData: false,
						series: {
							id: 'navigator',
							data: noiseDBA
						}
					},
					scrollbar: {
						liveRedraw: false
					},
					rangeSelector: {

						buttonSpacing: 1,
						buttons: [{
							type: 'day',
							count: 1,
							text: '1 day'
						}, {
							type: 'month',
							count: 1,
							text: '1 month'
						}, {
							type: 'year',
							count: 1,
							text: '1 year'
						}, {
							type: 'all',
							text: 'All'
						}],
						inputEnabled: true, // it supports only days
						selected: 0, // day

						buttonTheme: { // styles for the buttons
							width: 55,
							style: {
								'font-size': '0.875rem',
								fontWeight: '400',
							},
							states: {
								hover: {
									fill: '#00b5d3',
									style: {
										color: '#ffffff'
									},
								},
								select: {
									fill: '#009ac8',
									style: {
										color: '#ffffff'
									},
								},
								disabled: {
									fill: '#ececec',
									style: {
										color: '#b5b5b5'
									},
								},
							}
						},
					},
					title: {
						text: sensorName + " Sound Pressure Level"
					},
					xAxis: {
						type: 'datetime',
						/* events: {
						     afterSetExtremes: afterSetExtremes1 
						 },*/
						minRange: 3600 * 1000 // one hour
					},
					yAxis: {

						title: {
							text: 'Sound Pressure Level (dB)'
						},
						plotBands: [{

							from: 0,
							to: 20,
							color: 'rgba(0,228,0,.2)',
							label: {
								text: 'Leaves Fluttering'
							}
						}, {
							from: 20.1,
							to: 30.0,
							color: 'rgba(255, 255,0, .2)',
							label: {
								text: 'Whisper in Ear'
							}
						}, {
							from: 30.1,
							to: 60.0,
							color: 'rgba(255, 126,0, .2)',
							label: {
								text: 'Normal Speech'
							}
						}, {
							from: 60.1,
							to: 100.0,
							color: 'rgba(255, 0, 0, .2)',
							label: {
								text: 'Car/Vehicles Up Close'
							}
						}, {
							from: 100.1,
							to: 120.0,
							color: 'rgba(143,63,151 .2)',
							label: {
								text: 'Place Taking Off Up Close'
							}
						}, {
							from: 120.1,
							to: 140.0,
							color: 'rgba(126, 0, 35, .2)',
							label: {
								text: 'Pain Threshold'
							}

						}]
					},
					series: [{
							name: 'dB(Z)',
							data: noiseDBZ,
							dataGrouping: {
								enabled: false
							}

						},
						{
							name: 'dB(C)',
							data: noiseDBC,
							dataGrouping: {
								enabled: false
							}
						},
						{
							name: 'dB(A)',
							data: noiseDBA,
							dataGrouping: {
								enabled: false
							}
						}
					]
				});
			});
		}

		// Display current fires most recent 24 hour KML files
		function display_Active_Fires() {
			//var url = "https://firms.modaps.eosdis.nasa.gov/data/active_fire/modis-c6.1/kml/MODIS_C6_1_USA_contiguous_and_Hawaii_24h.kml";
			 var url = "https://inciweb.nwcg.gov/feeds/maps/"; // fire data is from inciweb
			//var url = "https://inciweb.nwcg.gov/state/california"
			var kmlOptions = {
				preserveViewport: true // keep center as is 
			};

			kmlLayer = new google.maps.KmlLayer(url, kmlOptions);

			//   kmlLayer.setMap(kmlLayer.getMap() ? null : map); //toggle

		}

		function toggle_Fires() {

			// kmlLayer.setMap(map); // show it

			if (kmlLayer.getMap() == null) { // if not already displaying then toggle on

				kmlLayer.setMap(map); // show it

			} else {
				kmlLayer.setMap(null); // hide it
			}
		}
		
		
		
		// --------------------------------------------------------------------------------------------------------------------------------------
		//----------------------------------------------------- begin charts ---------------------------------------------------------------------
        // ---------------------------------------------------------------------------------------------------------------------------------------
		//  ----- begin highcharts code, totally borrowed from ThingSpeakMultichannel.html

		// converts date format from JSON
		function getChartDate(d) {
			// get the data using javascript's date object (year, month, day, hour, minute, second)
			// months in javascript start at 0, so remember to subtract 1 when specifying the month
			// offset in minutes is converted to milliseconds and subtracted so that chart's x-axis is correct
			return Date.UTC(d.substring(0, 4), d.substring(5, 7) - 1, d.substring(8, 10), d.substring(11, 13), d.substring(14, 16), d.substring(17, 19)) - (myOffset * 60000);
		}

		function toggle(ele) {
			toggle1(ele);
			toggle2(ele);
		}

		function toggle1(ele) {
			var cont = document.getElementById('chart-container');
			cont.style.display = cont.style.display == 'none' ? 'block' : 'none';
		}

		function toggle2(ele) {
			var bcont = document.getElementById('below chart');
			bcont.style.display = bcont.style.display == 'block' ? 'none' : 'block';
		}

		function togTracks() {
			var x = document.getElementById("container");
			if (x.style.display === "none") {
				x.style.display = "block";
			} else {
				x.style.display = "none";
			}
		}
		
		function toggleData() {
			var choice = document.getElementById("data");
			if (choice == "PM"){
				viewData = "PM";
			}
		    else {
		    	viewData = "CO2";
		    }
			
		}

		function closeIt() {
			document.getElementById("info_map").style.display = "none";
			var epaChannel = ["1278481", "1278482", "1198056", "1278520"];
			var myobj1 = document.getElementById("1059654");

			//alert("closing BP1");
			document.body.removeChild(myobj1);
			//alert(myobj);
			// myobj.remove();
		}

		function closeChart() {

			document.getElementById("graph-container").style.display = "none";
			//document.getElementById("graph2-container").style.display = "none";
		}

		function closeDiv3() {
			document.getElementById('kmlprompt').style.visibility = "hidden";
			document.getElementById('screener').style.visibility = "hidden";
		}

		function closeInfoBox() {
			document.getElementById('info-box').style.visibility = "hidden";
			//document.getElementById("info-map").style.display = "none";
		}

		function getKMLLayer() {
			var cont = document.getElementById('chart-container');
			//  cont.style.display = cont.style.display == 'none' ? 'block' : 'none'; 
			document.getElementById('kmlprompt').style.visibility = "hidden";
			document.getElementById('screener').style.visibility = "hidden";

			var kmlOptions = {
				preserveViewport: false
			};

			if (kmlLayer) {
				kmlLayer.setMap(null);
			}

			var url = trim(document.getElementById('layerLink').value);
			kmlLayer = new google.maps.KmlLayer(url, kmlOptions);
			kmlLayer.setMap(map);
			document.getElementById('layerLink').value = "";
		} //end addKML()

		function addKML() {
			var kmlOptions = {
				preserveViewport: false
			};
			if (kmlLayer) {
				kmlLayer.setMap(null);
			}
			var url = document.getElementById('layerLink').value;
			kmlLayer = new google.maps.KmlLayer(url, kmlOptions);
			kmlLayer.setMap(map);
		} //end addKML()

		// user's timezone offset
		var myOffset = new Date().getTimezoneOffset();

		// Hide all series, via 'Hide All' button.  Then user can click on series name in legend to show series of interest.      
		function HideAll() {
			for (var index = 0; index < dynamicChart.series.length; index++) // iterate through each series
			{
				if (dynamicChart.series[index].name == 'Navigator')
					continue;
				dynamicChart.series[index].hide();
				//window.console && console.log('Series Number:',index,' Name:',dynamicChart.series[index].name);
			}
		}
		// hide some of the not-so relevant series
		function HideSome() {
			for (var index = 0; index < dynamicChart.series.length; index++) // iterate through each series
			{
				var seriesName = dynamicChart.series[index].name; console.log("SeriesName: " + seriesName);
				var current = ["YAQA-1", "YAQA-2", "YAQA-3", "YAQA-7", "YAQA-8", "YAQA-9"];
			   // var currentSeries = document.getElementById('below chart');  alert("Current Series" + currentSeries);
			   var currentSeries = "[YAQA-7] PM1.0 ug/m3 (CF1)";
				const banned = ["RSSI", "Uptime", "Latitude (deg)", "Latitude (Deg)", "Longitude (deg)", "Longitude (Deg)", "MWV",
								"Wind Speed", "Wind Speed Units", "Wind Angle, 0 to 359",
								"Reference R or T", "Temperature (Deg F)", "Temperature (Deg)", "temperature (Deg F)", "humidity (Relative %)", "Relative Humidity (%)", "Humidity (Relative %)"];
				if (banned.indexOf(seriesName) != -1) { // if in the list..
					dynamicChart.series[index].hide(); // hide it
				}
			/*	if (currentSeries.indexOf(seriesName) > 0) {
					dynamicChart.series[index].show(); //Show it
					console.log("Showing: " + seriesName);
					console.log("Index is: " + index);
				} else {
					dynamicChart.series[index].hide(); //Hide it		 
				} */
		   }
		  
	  }
		// show selected series
		function ShowSeries(index) {

			//  var seriesName = dynamicChart.series[index].name;

			dynamicChart.series[index].show(); // show it          
		}

		// ---------------------------------------------------------------------------------------------------     
		//  This is where the chart is generated.
		// ---------------------------------------------------------------------------------------------------
        
		/* jQuery(document).ready(function() // note: tread carefully here...this jQuery spans several functions!                     
			{

				$(document).on({
					ajaxStart: function() {
						$("body").addClass("loading");
					},
					ajaxStop: function() {
						$("body").removeClass("loading");
					}
				});*/

				// function allows for smooth scrolling via mouse rather than arrows
				(function(H) {
					
					
					 H.Pointer.prototype.drag = function(e) {
   		               var container = this.chart.container.parentElement;
                     //  container.style.left = container.offsetLeft + e.movementX + 'px';
                       container.style.top = container.offsetTop + e.movementY + 'px'; // only allow up/down movement so that pan-zoom works
                     }
					
				}(Highcharts));
				
			function startIt() {
				
				toggle(); // display chart container and sidebar options panel

				//Add Channel Load Menu
				var menu = document.getElementById("Channel Select");
				
				console.log("ChannelKeys Length: " + channelKeys.length);

				for (var channelIndex = 0; channelIndex < channelKeys.length; channelIndex++) // iterate through each channel
				{
					window.console && console.log('Channel Name',channelKeys[channelIndex].name);
					var menuOption = new Option(channelKeys[channelIndex].name, channelIndex);
					menu.options.add(menuOption, channelIndex);
				}
				var last_date; // variable for the last date added to the chart
				window.console && console.log('Starting chart build...');
				
				//make series numbers for each field
				var seriesCounter = 0
				for (var channelIndex = 0; channelIndex < channelKeys.length; channelIndex++) // iterate through each channel
				{
					for (var fieldIndex = 0; fieldIndex < channelKeys[channelIndex].fieldList.length; fieldIndex++) // iterate through each channel
					{
						channelKeys[channelIndex].fieldList[fieldIndex].series = seriesCounter;

						//window.console & console.log("ChannelKeys: " + channelKeys)
						seriesCounter++;
					}
				}

				//make calls to load data from each channel into channelKeys array now
				// draw the chart when all the data arrives, later asyncronously add history
				
				for (var channelIndex = 0; channelIndex < channelKeys.length; channelIndex++) // iterate through each channel
				
				{
					channelKeys[channelIndex].loaded = false;
					console.log("channelIndex: " + channelIndex);
					loadThingSpeakChannel(channelIndex, channelKeys[channelIndex].channelNumber, channelKeys[channelIndex].key, channelKeys[channelIndex].fieldList);
				}

				  window.console && console.log('Channel Keys',channelKeys);
				  
		} // startIt()

				// load the most recent 2500 points (fast initial load) from a ThingSpeak channel into a data[] array and return the data[] array
				function loadThingSpeakChannel(sentChannelIndex, channelNumber, key, sentFieldList) {
					var fieldList = sentFieldList;
					var channelIndex = sentChannelIndex;
					whichContainer = "chart-container";
					console.log("channelIndex: " + channelIndex);
					console.log("*key: " + key);
					console.log("channelNumber: " + channelNumber);
					// get the Channel data with a webservice call
					$.getJSON('https://api.thingspeak.com/channels/' + channelNumber + '/feed.json?&offset=0&results=2500;key=' + key, function(data) {
							// if no access
							if (data == '-1') {
								$('#chart-container').append('This channel is not public.  To embed charts, the channel must be public or a read key must be specified.');
								window.console && console.log('Thingspeak Data Loading Error');
							}
							for (var fieldIndex = 0; fieldIndex < fieldList.length; fieldIndex++) // iterate through each field
							{
								fieldList[fieldIndex].data = [];
								for (var h = 0; h < data.feeds.length; h++) // iterate through each feed (data point)
								{
									var p = [] //new Highcharts.Point();
									var fieldStr = "data.feeds[" + h + "].field" + fieldList[fieldIndex].field;
									var v = eval(fieldStr);
									p[0] = getChartDate(data.feeds[h].created_at);
									p[1] = parseFloat(v);
									// if a numerical value exists add it
									if (!isNaN(parseInt(v))) {
										fieldList[fieldIndex].data.push(p);
									}
								}
								fieldList[fieldIndex].name = eval("data.channel.field" + fieldList[fieldIndex].field);

								if (fieldIndex < 4) { // a PM value
									unitsTT[fieldIndex] = "µg/m³";
								} else if (fieldIndex == 4) { // Temp
									unitsTT[fieldIndex] = "deg";
								} else if (fieldIndex == 5) { // Humidity
									unitsTT[fieldIndex] = "%";
								} else if (fieldIndex == 6 || fieldIndex == 7) { // Lat or Lon
									unitsTT[fieldIndex] = "deg";
								} else { // AQI 
									unitsTT[fieldIndex] = " ";
								}

							}
							//  window.console && console.log('getJSON field name:',fieldList[0].name);
							channelKeys[channelIndex].fieldList = fieldList;
							channelKeys[channelIndex].loaded = true;
							channelsLoaded++;
							window.console && console.log('channels Loaded:',channelsLoaded);
							window.console && console.log('channel index:',channelIndex);
							if (channelsLoaded == channelKeys.length) // if channels loaded OK then create chart and legend
							{
								createChart(); // actually draw chart!
								
								 HideSome(); // hide just the non-AQ stuff (met, temp, humidity, etc.)
								//HideAll(); // default is to initially hide all series
								// ShowSeries(userSelectedChannel); // show current user series
							}
						})
						// .fail(function() { alert('getJSON request failed! '); });
						.fail(function() {
							alert('getJSON request failed! ');
						});
				} // loadThingSpeakChannel()
				//
				//----------------------------------------------------------------------------------
				// create the chart 
				function createChart() {
					// specify the chart options
					console.log("Creating chart...");
					var chartOptions = {
						chart: {
							renderTo: whichContainer,
							zoomType: 'y',
							events: {
									
								
								load: function() {
				
															
									if ('true' === 'true' && (''.length < 1 && ''.length < 1 && ''.length < 1 && ''.length < 1 && ''.length < 1)) {
										// If the update checkbox is checked, get latest data every 15 seconds and add it to the chart
										setInterval(function() {
											if (document.getElementById("Update").checked) {
												for (var channelIndex = 0; channelIndex < channelKeys.length; channelIndex++) // iterate through each channel
												{
													(function(channelIndex) {
														// get the data with a webservice call
														//  $.getJSON('https://api.thingspeak.com/channels/'+channelKeys[channelIndex].channelNumber+'/feed/last.json?&offset=0&results=2500;key='+key, function(data)
														$.getJSON('https://api.thingspeak.com/channels/' + channelKeys[channelIndex].channelNumber + '/feed/last.json?&offset=0&results=2500;key=' + channelKeys[channelIndex].key, function(data) {
															for (var fieldIndex = 0; fieldIndex < channelKeys[channelIndex].fieldList.length; fieldIndex++) {
																// if data exists
																var fieldStr = "data.field" + channelKeys[channelIndex].fieldList[fieldIndex].field;
																var chartSeriesIndex = channelKeys[channelIndex].fieldList[fieldIndex].series;
																if (data && eval(fieldStr)) {
																	var p = [];
																	//new Highcharts.Point();
																	var v = eval(fieldStr);
																	p[0] = getChartDate(data.created_at);
																	p[1] = parseFloat(v);
																	
																	// get the last date if possible
																	if (dynamicChart.series[chartSeriesIndex].data.length > 0) {
																		// last_date = dynamicChart.series[chartSeriesIndex].data[dynamicChart.series[chartSeriesIndex].data.length-1].x; // ??????
																	}
																	var shift = false; //default for shift
																	// if a numerical value exists and it is a new date, add it
																	if (!isNaN(parseInt(v)) && (p[0] != last_date)) {
																		dynamicChart.series[chartSeriesIndex].addPoint(p, true, shift);
																	}
																}
																//window.console && console.log('channelKeys:',channelKeys);
																//window.console && console.log('chartSeriesIndex:',chartSeriesIndex);
																//window.console && console.log('channel index:',channelIndex);
																//window.console && console.log('field index:',fieldIndex);
																//window.console && console.log('update series name:',dynamicChart.series[chartSeriesName].name);
																//window.console && console.log('channel keys name:',channelKeys[channelIndex].fieldList[fieldIndex].name);
															}
														});
													})(channelIndex);
												}
											}
										}, 15000);
									}
									  var chart = this;
									  chart.renderer.image('https://www.backpaqlabs.com/images/close-button-png-30241.png', 65, 15, 20, 20)
                                      .on('click', function() {
                                        //  alert('Button clicked!')
							            document.getElementById("chart-container").style.display = "none";
                                       })
                                      .add();
								}
							}
						},
						title: {
							useHTML: true,
							text: '<b>BackpAQ Air Quality Community Sensor Data</b>'
						},
						subtitle: {
							text: 'Click on legend to show or hide chart data',
							style: {
								color: '#7cb5ec',
								align: 'right',
								x: -10,
								fontWeight: 'bold'
							}
						},
						rangeSelector: {
							buttons: [{
								count: 30,
								type: 'minute',
								text: '30M'
							}, {
								count: 12,
								type: 'hour',
								text: '12H'
							}, {
								count: 1,
								type: 'day',
								text: 'D'
							}, {
								count: 1,
								type: 'week',
								text: 'W'
							}, {
								count: 1,
								type: 'month',
								text: 'M'
							}, {
								count: 1,
								type: 'year',
								text: 'Y'
							}, {
								type: 'all',
								text: 'All'
							}],
							inputEnabled: true,
							selected: 1
						},
						plotOptions: {
							spline: {
								gapSize: 5,
								//color: '#d62020'
								//  },
								//  bar: {
								//color: '#d52020'
								//  },
								//  column: 
								
                                 events: {
                                     legendItemClick: function() {
                                       var seriesIndex = this.index;
                                       var series      = this.chart.series;
                                       if (this.visible && this.chart.restIsHidden) {
                                         $(series).each(function(){
                                          this.setVisible(true, false);
                                         });
                                         this.chart.restIsHidden = false;
                                        } else {
                                               $(series).each(function(){
                                                  this.setVisible(false, false);
                                               });
                                             this.show()
                                             this.chart.restIsHidden = true;
                                        }
                                        return false;
                                     }
                                   },
                                  showInLegend: true
							  
							},
							series: {
								marker: {
									radius: 2
								},
								animation: true,
								step: false,
								turboThrehold: 1000,
								borderWidth: 0
							}
						},
						tooltip: {
							enabled: true,
							valueDecimals: 1,
							//  valueSuffix: unitsTT[0], // fieldList[fieldIndex] field1=PM1, field2=xPM2.5, field3=PM10, field4=temp, field5=hum, field6=lat, field7=lon, field8=AQI
							xDateFormat: '%Y-%m-%d<br/>%H:%M:%S %p',
							// reformat the tooltips so that local times are displayed
							// formatter: function() {
							//    var d = new Date(this.x + (myOffset*60000));
							//  console.log("this.x " + this.x);
							//  console.log("this.y: " + this.y);
							////  console.log("point.series.name: " + point.series.name);
							//   console.log("this.series.name: " + this.series.name);

							//   var n = (this.point.name === undefined) ? '' : '<br/>' + this.point.name;
							//  return this.series.name + ':<b>' + this.y + '</b>' + n + '<br/>' + d.toDateString() + '<br/>' + d.toTimeString().replace(/\(.*\)/, "");
							//console.log(channelKeys[i][1]);
							// return point.series.name + ':<b>' + point.y + '</b>' + 'µg/m³';

						},
						xAxis: {
							type: 'datetime',
							ordinal: false,
							min: Date.UTC(2018, 01, 01),
							dateTimeLabelFormats: {
								hour: '%l %p',
								minute: '%l:%M %p'
							},
							title: {
								text: 'test'
							}
						},
						yAxis: [{

							title: {
								text: unitsPM
							},
							opposite: true,
							id: 'O',

						}],

						exporting: {
							enabled: true,
							csv: {
								//  dateFormat: '%d/%m/%Y %I:%M:%S %p'
								dateFormat: '%Y-%m-%d %H:%M:%S'
							}
						},
						legend: {
							enabled: true
							
						},
						navigator: {
							baseSeries: 0, //select which series to show in history navigator, First series is 0
							adaptToUpdatedData: true,
							series: {
								includeInCSVExport: false,
								data: channelKeys[4].fieldList[4].data
							}
						},
						series: []
						//series: [{data:[[getChartDate("2013-06-16T00:32:40Z"),75]]}]      
					};

					// add all Channel data to the chart
					for (var channelIndex = 0; channelIndex < channelKeys.length; channelIndex++) // iterate through each channel
					{
						for (var fieldIndex = 0; fieldIndex < channelKeys[channelIndex].fieldList.length; fieldIndex++) // add each field
						{
							//window.console && console.log('Channel '+channelIndex+' field '+fieldIndex);
							chartOptions.series.push({
								data: channelKeys[channelIndex].fieldList[fieldIndex].data,
								index: channelKeys[channelIndex].fieldList[fieldIndex].series,
								yAxis: channelKeys[channelIndex].fieldList[fieldIndex].axis,
								//visible:false,
								name: channelKeys[channelIndex].fieldList[fieldIndex].name
							});
						}
					}
					// set chart labels here so that decoding occurs properly
					//chartOptions.title.text = data.channel.name;
					chartOptions.xAxis.title.text = 'Date';

					// draw the chart
					dynamicChart = new Highcharts.StockChart(chartOptions);

					// update series number to account for the navigator series (The historical series at the bottom) which is the first series.
					for (var channelIndex = 0; channelIndex < channelKeys.length; channelIndex++) // iterate through each channel
					{
						for (var fieldIndex = 0; fieldIndex < channelKeys[channelIndex].fieldList.length; fieldIndex++) // and each field
						{
							for (var seriesIndex = 0; seriesIndex < dynamicChart.series.length; seriesIndex++) // compare each series name
							{
								if (dynamicChart.series[seriesIndex].name == channelKeys[channelIndex].fieldList[fieldIndex].name) {
									channelKeys[channelIndex].fieldList[fieldIndex].series = seriesIndex;
								}
							}
						}
					}
					// add all history
					//dynamicChart.showLoading("Loading History..." );
					//  window.console && console.log('Channels: ',channelKeys.length);
				   try {
					for (var channelIndex = 0; channelIndex < channelKeys.length; channelIndex++) // iterate through each channel
					{
						// window.console && console.log('channelIndex: ',channelIndex);
						(function(channelIndex) {
							//load only 1 set of 8000 points
							loadChannelHistory(channelIndex, channelKeys[channelIndex].channelNumber, channelKeys[channelIndex].key, channelKeys[channelIndex].fieldList, 0, 1);
						})(channelIndex);
					}
				   }
				   catch (e) {
					 console.log("No data for this channel.");
					}
			   }  
			//});

		function loadOneChannel() {
			//console.log("start: " + now());
			// load a channel selected in the popUp menu.
			var selectedChannel = document.getElementById("Channel Select");

			var maxLoads = document.getElementById("Loads").value;
			var channelIndex = selectedChannel.selectedIndex;

			loadChannelHistory(channelIndex, channelKeys[channelIndex].channelNumber, channelKeys[channelIndex].key, channelKeys[channelIndex].fieldList, 0, maxLoads);
			// console.log("end: " + now());
		}

		// load next 8000 points from a ThingSpeak channel and addPoints to a series
		function loadChannelHistory(sentChannelIndex, channelNumber, key, sentFieldList, sentNumLoads, maxLoads) {
			var numLoads = sentNumLoads
			var fieldList = sentFieldList;
			var channelIndex = sentChannelIndex;
			var first_Date = new Date();
			if (typeof fieldList[0].data[0] != "undefined") first_Date.setTime(fieldList[0].data[0][0] + 7 * 60 * 60 * 1000); //adjust for 7 hour difference from GMT (Zulu time)
			else if (typeof fieldList[1].data[0] != "undefined") first_Date.setTime(fieldList[1].data[0][0] + 7 * 60 * 60 * 1000);
			else if (typeof fieldList[2].data[0] != "undefined") first_Date.setTime(fieldList[2].data[0][0] + 7 * 60 * 60 * 1000);
			else if (typeof fieldList[3].data[0] != "undefined") first_Date.setTime(fieldList[3].data[0][0] + 7 * 60 * 60 * 1000);
			else if (typeof fieldList[4].data[0] != "undefined") first_Date.setTime(fieldList[4].data[0][0] + 7 * 60 * 60 * 1000);
			else if (typeof fieldList[5].data[0] != "undefined") first_Date.setTime(fieldList[5].data[0][0] + 7 * 60 * 60 * 1000);
			else if (typeof fieldList[6].data[0] != "undefined") first_Date.setTime(fieldList[6].data[0][0] + 7 * 60 * 60 * 1000);
			else if (typeof fieldList[7].data[0] != "undefined") first_Date.setTime(fieldList[7].data[0][0] + 7 * 60 * 60 * 1000);
			var end = first_Date.toJSON();
			// window.console && console.log('earliest date:',end);
			// window.console && console.log('sentChannelIndex:',sentChannelIndex);
			// window.console && console.log('numLoads:',numLoads);
			// get the Channel data with a webservice call
			$.getJSON('https://api.thingspeak.com/channels/' + channelNumber + '/feed.json?&offset=0&results=2500;key=' + key, function(data) {
				// if no access
				if (data == '-1') {
					$('#chart-container').append('This channel is not public.  To embed charts, the channel must be public or a read key must be specified.');
					window.console && console.log('Thingspeak Data Loading Error');
				}
				for (var fieldIndex = 0; fieldIndex < fieldList.length; fieldIndex++) // iterate through each field
				{
					//fieldList[fieldIndex].data =[];
					for (var h = 0; h < data.feeds.length; h++) // iterate through each feed (data point)
					{
						var p = [] //new Highcharts.Point();
						var fieldStr = "data.feeds[" + h + "].field" + fieldList[fieldIndex].field;
						var v = eval(fieldStr);
						p[0] = getChartDate(data.feeds[h].created_at);
						p[1] = parseFloat(v);
						// if a numerical value exists add it
						if (!isNaN(parseInt(v))) {
							fieldList[fieldIndex].data.push(p);
						}
					}
					fieldList[fieldIndex].data.sort(function(a, b) {
						return a[0] - b[0]
					});
					dynamicChart.series[fieldList[fieldIndex].series].setData(fieldList[fieldIndex].data, false);
					//dynamicChart.series[fieldList[fieldIndex].series].addPoint(fieldList[fieldIndex].data,false);
					//fieldList[fieldIndex].name = eval("data.channel.field"+fieldList[fieldIndex].field);
					//window.console && console.log('data added to series:',fieldList[fieldIndex].series,fieldList[fieldIndex].data);
				}
				channelKeys[channelIndex].fieldList = fieldList;
				dynamicChart.redraw()
				//  window.console && console.log('channel index:',channelIndex);
				numLoads++;
				if (numLoads < maxLoads) {
					console.log("Loading channel" + channelNumber);
					loadChannelHistory(channelIndex, channelNumber, key, fieldList, numLoads, maxLoads);
				}
			});
		}
		
	