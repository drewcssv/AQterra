function prepareSyncFrame(sensorURL, dev) {
	
	console.log("Current Device Name is " + currentDeviceName2);
	
    // Create the container with an ID for easy toggling
    var container = document.createElement("div");
    container.setAttribute("id", "container1"); // Use this ID in the showHide function
    container.style.position = "relative";
    container.style.width = "99%";
    container.style.height = "100%";
    container.style.top = "5px";
    container.style.left = "0px";
    container.style.zIndex = "1000";
    container.style.display = "none"; // Initially hidden

    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", "https://www.backpaqlabs.com/sycndcharts4xaqizzc_UI_X_F_DB_fix_Q.newcal.heat2.html?community=" + newSensorURL+"&device=" + dev);
    ifrm.style.width = "100%";
    ifrm.style.height = "100%";
    ifrm.style.border = "8px solid blue";

    var closeButton = document.createElement("button");
    closeButton.innerHTML = "X";
    closeButton.style.position = "absolute";
    closeButton.style.top = "2%";
    closeButton.style.right = "0";
    closeButton.style.zIndex = "1010";

    // Adjusted close button functionality
    closeButton.onclick = function() {
        container.style.display = "none"; // Directly manipulate container visibility
    };

    container.appendChild(ifrm);
    container.appendChild(closeButton);

    document.getElementById("map_canvas").appendChild(container); // Note "map-canvas" rather than "map"

}