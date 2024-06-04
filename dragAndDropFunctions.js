	/* DOM (drag/drop) functions */
		function initEvents() {
			[...document.getElementsByClassName("file")].forEach((fileElement) => {
				fileElement.addEventListener(
					"dragstart",
					(e) => {
						e.dataTransfer.setData(
							"text/plain",
							JSON.stringify(files[Number(e.target.dataset.value)])
						);
						console.log(e);
					},
					false
				);
			});

			// set up the drag & drop events
			const mapContainer = document.getElementById("map");
			mapContainer.addEventListener("dragenter", addClassToDropTarget, false);
			mapContainer.addEventListener("dragover", addClassToDropTarget, false);
			mapContainer.addEventListener("drop", handleDrop, false);
			mapContainer.addEventListener("dragleave", removeClassFromDropTarget, false);
		}

		function addClassToDropTarget(e) {
			e.stopPropagation();
			e.preventDefault();
			document.getElementById("map").classList.add("over");
			return false;
		}

		function removeClassFromDropTarget(e) {
			document.getElementById("map").classList.remove("over");
		}

		function handleDrop(e) {
			console.log("handleDrop");
			e.preventDefault();
			e.stopPropagation();
			removeClassFromDropTarget(e);
			const files = e.dataTransfer.files;

			// alert(files.value);
			if (files.length) {
				// process file(s) being dropped
				// grab the file data from each file
				for (let i = 0, file;
					(file = files[i]); i++) {
					// console.log("file: " + file));
					const reader = new FileReader();

					reader.onload = function(e) {
						loadGeoJsonString(reader.result);
						//  alert(reader.result);
					};

					reader.onerror = function(e) {
						console.error("reading failed");
					};

					reader.readAsText(file);
				}
			} else {
				// process non-file (e.g. text or html) content being dropped
				// grab the plain text version of the data
				const plainText = e.dataTransfer.getData("text/plain");
				// console.log(plainText);

				if (plainText) {
					loadGeoJsonString(plainText);
				}
			}
			// prevent drag event from bubbling further
			return false;
		} 
		
	function readSingleFile(evt) {
			var f = evt.target.files[0]; 
			if (f) {
				var r = new FileReader();
				r.onload = function(e) {
					var contents = e.target.result;
				//	alert(contents);
					document.write("File Uploaded! <br />" + "name: " + f.name + "<br />" + "content: " + contents + "<br />" + "type: " + f.type + "<br />" + "size: " + f.size + " bytes <br />");

					var lines = contents.split("\n"),
						output = [];
					for (var i = 0; i < lines.length; i++) {
						output.push("<tr><td>" + lines[i].split(",").join("</td><td>") + "</td></tr>");
					}
					output = "<table>" + output.join("") + "</table>";
					document.write(output);
				}
				r.readAsText(f);
				document.write(output);
			} else {
				alert("Failed to load file");
			}
		}
	
    /* Drag drop stuff */
    window.ondragover = function(e) {e.preventDefault()}
    window.ondrop = function(e) {
	    e.preventDefault();
	    console.log("Reading...");
	    var length = e.dataTransfer.items.length;
	    if(length > 1){
	    	console.log("Please only drop 1 file.");
	    } else {
	    	upload(e.dataTransfer.files[0]);
	    }
	}