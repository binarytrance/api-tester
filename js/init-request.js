(function() {
	var idVal = 0;
	var httpRequest;
	var submitButton = document.getElementById("submit-btn");
	var requestType;
	var statusCode;
	var jsonOutput;
	var addQueryButton = document.getElementById("addQuery");
	var queryInput1 = document.getElementById("queryGroup-1");
	var headerInput1 = document.getElementById("headerGroup-1");
	var addHeaderButton = document.getElementById("addHeader");
	var deleteButton = document.getElementsByClassName("delete");
	var queryGroup = document.getElementsByClassName("query-group");
	var headerGroup = document.getElementsByClassName("header-group");
	console.log(deleteButton);
	// console.log(queryInput);
	submitButton.addEventListener("click", makeRequest);
	addClickEvent()

	// $("#addQuery").on("click", function(e) {
	// 	e.preventDefault();
	// })

	addQueryButton.addEventListener("click", addNewQuery);
	addHeaderButton.addEventListener("click", addNewHeader);
	// delete functionality
	function addClickEvent() {
		for(var i = 0; i < deleteButton.length; i++) {
			console.log(deleteButton[i]);
			deleteButton[i].addEventListener("click", deleteNode)
		}
	}
	
	// deleteButton.addEventListener("click", deleteNode);

	function deleteNode() {
		console.log(90990)
		console.log(this.parentNode)
		this.parentNode.remove();
	}

	function addNewQuery() {
		var queryInput = document.getElementById("queryGroup-1");
		// console.log(document.getElementById("queryGroup-1").length);
		if(queryInput) {
			var queryGroupLength = queryGroup.length;
			console.log(queryGroupLength, queryGroup[queryGroupLength - 1]);
			var lastElement = queryGroup[queryGroupLength - 1].dataset.serial;
			console.log(lastElement);
			idVal = lastElement;
			idVal++;
		}
		else {
			idVal = 1;
			queryInput = queryInput1;
		}
		console.log(idVal);
		var queryClone = queryInput.cloneNode(true);
		queryClone.id = "queryGroup-" + idVal;
		queryClone.getElementsByClassName("query-key")[0].id = "queryKey-" + idVal;
		queryClone.getElementsByClassName("query-key")[0].value = "";
		queryClone.getElementsByClassName("query-value")[0].id = "queryValue-" + idVal;
		queryClone.getElementsByClassName("query-value")[0].value = "";
		queryClone.dataset.serial = idVal;
		console.log(queryClone);
		document.getElementsByClassName("input-group--query")[0].appendChild(queryClone);
		addClickEvent();
	}

	function addNewHeader() {
		var headerInput = document.getElementById("headerGroup-1");
		// console.log(document.getElementById("queryGroup-1").length);
		if(headerInput) {
			var headerGroupLength = headerGroup.length;
			console.log(headerGroupLength, headerGroup[headerGroupLength - 1]);
			var lastElement = headerGroup[headerGroupLength - 1].dataset.serial;
			console.log(lastElement);
			idVal = lastElement;
			idVal++;
		}
		else {
			idVal = 1;
			headerInput = headerInput1;
		}
		console.log(idVal);
		var headerClone = headerInput.cloneNode(true);
		headerClone.id = "headerGroup-" + idVal;
		headerClone.getElementsByClassName("header-key")[0] = "headerKey-" + idVal;
		headerClone.getElementsByClassName("header-key")[0].value = "";
		headerClone.getElementsByClassName("header-value")[0] = "headerValue-" + idVal;
		headerClone.getElementsByClassName("header-value")[0].value = "";
		headerClone.dataset.serial = idVal;
		console.log(headerClone);
		document.getElementsByClassName("input-group--header")[0].appendChild(headerClone);
		addClickEvent()
	}

	function makeRequest() {
		// empties the object (used to store query parameters) everytime you click on test api
		var queryObj = {};
		var headerObj = {};
		var queryUrl = document.getElementById("queryURL").value;
		console.log(queryUrl);
		requestType = document.getElementById("requestType").value;
		console.log(requestType);
		// var queryKeys = document.getElementsByClassName("query-key");
		console.log(queryGroup.length);
		// run a loop through all query parameter groups and store them in an object
		for(var i = 0; i < queryGroup.length; i++) {
			var queryKey = document.getElementsByClassName("query-key")[i].value;
			var queryVal = document.getElementsByClassName("query-value")[i].value;
			// queryArr.push(queryKeys[i].value);
			queryObj[queryKey] = queryVal;
		}
		for(var i = 0; i < headerGroup.length; i++) {
			var headerKey = document.getElementsByClassName("header-key")[i].value;
			var headerValue = document.getElementsByClassName("header-value")[i].value;
			headerObj[headerKey] = headerValue;
		}
		console.log(queryObj);
		console.log(headerObj);
		// creating an instance of the xmlhttprequest function
		httpRequest = new XMLHttpRequest();

		if(!httpRequest) {
			alert("There's no point to anything. Go Home");
			return false;
		}
		if(queryObj.length != 0) {
			queryUrl = queryUrl + "?";
			console.log(queryUrl, queryObj);
			for(var property in queryObj) {
				console.log(queryObj);
				if(queryUrl[queryUrl.length - 1] === "?") {
					queryUrl = queryUrl + property + "=" + queryObj[property];
					console.log(queryUrl);
				}
				else {
					queryUrl = queryUrl + "&" + property + "=" + queryObj[property];
				}

			}
		}
		// assigning a reference of the function outputFunction to onreadystatechange of the object
		httpRequest.onreadystatechange = outputFunction;
		httpRequest.open(requestType, queryUrl);
		for(var property in headerObj) {
			httpRequest.setRequestHeader(property, headerObj[property]);
		}
		
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

