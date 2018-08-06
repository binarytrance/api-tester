(function() {
	var httpRequest;
	var submitButton = document.getElementById("submit-btn");
	var requestType;
	var statusCode;
	var jsonOutput;
	submitButton.addEventListener("click", makeRequest);

	$("#addQuery").on("click", function(e) {
		e.preventDefault();
	})

	function makeRequest() {

		requestType = document.getElementById("requestType").value;
		console.log(requestType);
		// creating an instance of the xmlhttprequest function
		httpRequest = new XMLHttpRequest();

		if(!httpRequest) {
			alert("There's no point to anything. Go Home");
			return false;
		}
		// assigning a refernce of the function outputFunction to onreadystatechange of the object
		httpRequest.onreadystatechange = outputFunction;
		httpRequest.open("\"" + requestType +"\"", "http://sampleurl.com");
		httpRequest.send();
	}

	function outputFunction() {
		try {
			if(httpRequest.readyState === XMLHttpRequest.DONE) {
				statusCode = httpRequest.status;
				if(statusCode === 200) {
					alert(httpRequest.responseText);
				}
				else {
					alert("There was a problem with the request.");
				}
			}
		}
		catch(e) {
			alert("Caught Exception: " + e.description);
		}
	}
})();