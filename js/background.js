chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if (request.method == "getLocalStorage") {
      	sendResponse({data: localStorage[request.key]});
    } 

    else if (request.method == "updateLocalStorage") {
    	// uploadnut data do local storu
    	console.log(request.key);
    	localStorage[request.key] = request.data;
      	//sendResponse("OK");
    } 

    else {
      	sendResponse({});
    }

});