(function() {
	var idVal = 0;
	var httpRequest;
	var submitButton = document.getElementById("submit-btn");
	var requestType;
	var statusCode;
	var jsonOutput;
	var addQueryButton = document.getElementById("addQuery");
	var queryInput = document.getElementById("queryGroup-1");
	var headerInput = document.getElementById("headerGroup-1");
	var addHeaderButton = document.getElementById("addHeader");
	var deleteButton = document.getElementsByClassName("delete")[0];
	console.log(deleteButton);
	submitButton.addEventListener("click", makeRequest);

	// $("#addQuery").on("click", function(e) {
	// 	e.preventDefault();
	// })

	addQueryButton.addEventListener("click", addNewQuery);
	addHeaderButton.addEventListener("click", addNewHeader);
	deleteButton.addEventListener("click", deleteNode);

	function deleteNode() {
		console.log(90990)
		console.log(this.parentNode)
	}

	function addNewQuery() {
		console.log(document.getElementById("queryGroup-1").length);
		if(queryInput) {
			var queryGroupLength = document.getElementsByClassName("query-group").length;
			console.log(queryGroupLength, document.getElementsByClassName("query-group")[queryGroupLength - 1]);
			var lastElement = document.getElementsByClassName("query-group")[queryGroupLength - 1].dataset.serial;
			console.log(lastElement);
			idVal = lastElement;
			idVal++;
		}
		else {
			idVal = 1;
		}
		console.log(idVal);
		var queryClone = queryInput.cloneNode(true);
		queryClone.id = "queryGroup-" + idVal;
		queryClone.dataset.serial = idVal;
		console.log(queryClone);
		document.getElementsByClassName("input-group--query")[0].appendChild(queryClone)
	}

	function addNewHeader() {
		console.log(document.getElementById("queryGroup-1").length);
		if(headerInput) {
			var headerGroupLength = document.getElementsByClassName("header-group").length;
			console.log(headerGroupLength, document.getElementsByClassName("header-group")[headerGroupLength - 1]);
			var lastElement = document.getElementsByClassName("header-group")[headerGroupLength - 1].dataset.serial;
			console.log(lastElement);
			idVal = lastElement;
			idVal++;
		}
		else {
			idVal = 1;
		}
		console.log(idVal);
		var headerClone = headerInput.cloneNode(true);
		headerClone.id = "headerGroup-" + idVal;
		headerClone.dataset.serial = idVal;
		console.log(headerClone);
		document.getElementsByClassName("input-group--header")[0].appendChild(headerClone)
	}

	function deleteNode() {

	}

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