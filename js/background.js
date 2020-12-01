chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if (request.method == "getLocalStorage") {
      	sendResponse({data: localStorage[request.key]});
    } 

    else if (request.method == "updateLocalStorage") {
    	localStorage[request.key] = request.data;
    	sendResponse();
    } 

    else {
      	sendResponse({});
    }

});