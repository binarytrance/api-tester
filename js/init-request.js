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
	// adds event handler and execution function for adding new query fields
	addQueryButton.addEventListener("click", addNewQuery);
	// adds event handler and execution function for adding new headers
	addHeaderButton.addEventListener("click", addNewHeader);
	// delete functionality also adds click eevent listener to newly created fields
	function addClickEvent() {
		for(var i = 0; i < deleteButton.length; i++) {
			console.log(deleteButton[i]);
			deleteButton[i].addEventListener("click", deleteNode);
		}
	}
	
	// deleteButton.addEventListener("click", deleteNode);

	function deleteNode() {
		this.parentNode.remove();
	}

	function addNewQuery() {
		var queryInput = document.getElementById("queryGroup-1");
		// console.log(document.getElementById("queryGroup-1").length);
		if(queryInput) {
			var queryGroupLength = queryGroup.length;
			var lastElement = queryGroup[queryGroupLength - 1].dataset.serial;
			idVal = lastElement;
			idVal++;
		}
		else {
			idVal = 1;
			queryInput = queryInput1;
		}
		var queryClone = queryInput.cloneNode(true);
		queryClone.id = "queryGroup-" + idVal;
		queryClone.getElementsByClassName("query-key")[0].id = "queryKey-" + idVal;
		queryClone.getElementsByClassName("query-key")[0].value = "";
		queryClone.getElementsByClassName("query-value")[0].id = "queryValue-" + idVal;
		queryClone.getElementsByClassName("query-value")[0].value = "";
		queryClone.dataset.serial = idVal;
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
		document.getElementsByClassName("output-data")[0].innerHTML = "";
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
			// add key value pairs only when theres data in the input fields
			if(queryKey != "" && queryVal != "") {
				queryObj[queryKey] = queryVal;
			}
		}
		// run a loop through all header groups and store them in an object
		for(var i = 0; i < headerGroup.length; i++) {
			var headerKey = document.getElementsByClassName("header-key")[i].value;
			var headerValue = document.getElementsByClassName("header-value")[i].value;
			// add key value pairs only when theres data in the input fields
			if(headerKey != "" && headerValue != "") {
				headerObj[headerKey] = headerValue;
			}
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
					console.log(queryUrl);
				}

			}
		}
		// assigning a reference of the function outputFunction to onreadystatechange of the object
		httpRequest.onreadystatechange = outputFunction;
		httpRequest.open(requestType, queryUrl, headerObj);
		if(headerObj != {}) {
			for(var property in headerObj) {
			httpRequest.setRequestHeader(property, headerObj[property]);
		}
		}
		
		
		httpRequest.send();
	}

	function outputFunction() {
		// try {
			if(httpRequest.readyState === XMLHttpRequest.DONE) {
				statusCode = httpRequest.status;
				document.getElementsByClassName("code")[0].innerHTML = statusCode;
				console.log(statusCode)
				if(statusCode === 200) {
					// alert(httpRequest.responseText);
					var responseJSONObject = JSON.parse(httpRequest.responseText);
					var responseJSONString = httpRequest.responseText;
					// console.log(responseJSONString);
					responseJSONObject.forEach(function(obj) {
						console.log(obj);
					})
					// console.log(typeof responseJSONString)
					var beautJSON = JSON.stringify(responseJSONObject, undefined, 4);
					console.log(beautJSON)
					document.getElementsByClassName("output-data")[0].innerHTML = beautJSON;

					// for(var property in responseJSON) {
					// 	console.log(property);
					// }
				}
				else {
					alert("There was a problem with the request.");
				}
			}
		// }
		// catch(e) {
		// 	alert("Caught Exception: " + e.description);
		// }
	}
})();

