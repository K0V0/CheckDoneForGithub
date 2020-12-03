
function PopupFunctions() {
  	this.init();
}

PopupFunctions.prototype = {
  	constructor: PopupFunctions,

	init: function() {

	},

  	changeButtons: function(state) {
		$('button#enable, button#reset').toggleClass(function() {
			if (state === true) {
				return 'enabled';
			} 
		});
	},

	// pre posielanie requestov z popup alebo ineho framu rozsirenia treba pouzit tabs.query
	sendBroadcast: function(method) {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {method: method}, function(response) {
                if (!window.chrome.runtime.lastError) {
                    //
                }
            });  
        });
	}
}