/*
manipuluje s html stranky
nema pristup k html rozsirenia samotneho (popup)
*/

function Content() {
	this.FX = new ContentFunctions();
	this.current_page_hash;
	this.data;
	this.currentPageData;
	this.currentCheckboxes;
	this.store_timer;
	this.store_wait_time = 250;
	this.init();
}

Content.prototype = {
	constructor: Content,

	init: function() {
		var totok = this;
		this.current_page_hash = this.FX.currentPageHash();

		chrome.runtime.sendMessage({method: "getLocalStorage", key: "pages"}, function(response) {
	  		//console.log(response.data);
		  	totok.data = uncompressData(response.data);
		  	//console.log(totok.data);
		  	if (totok.FX.isThisPageEnabled(totok.data) === true) {
		  		totok.currentPageData = getData(totok.data, totok.current_page_hash);
		  		totok.currentCheckboxes = totok.currentPageData.data.checkboxes;
		  		//console.log(totok.currentPageData);
		  		totok.displayCheckboxes();
		  	} else { 
		  		totok.removeCheckboxes(); 
		  	}
		});
	},

	displayCheckboxes: function() {
		var totok = this;
		var mdContainer = $(document).find('#readme');

		// generate unique hashes for all li elements based on its text
		mdContainer.find('li').each(function() {
			totok.FX.addMD5id($(this));
		});

		mdContainer.find('li').each(function() {
			// draw checkbox with belonging state according to data from store
			//console.log(totok.FX.getCheckboxState(totok.currentCheckboxes, $(this).attr('id')));
			totok.FX.appendCheckbox(
				$(this), 
				totok.FX.getCheckboxState(totok.currentCheckboxes, $(this).attr('id'))
			);
		});

		var list_items = mdContainer.find('input[type=checkbox].git-taskchecker-checkbox')

		list_items.on('click', function() {
			var is_checked = $(this).is(':checked'); 
			// ^^ new state already there after click even if inside this onclick handler
			var	scope_ancestors = $(this).siblings().find('input[type=checkbox].git-taskchecker-checkbox');
			scope_ancestors.attr('checked', is_checked);  
			// ^^ manipulates atribute of element, not val/props, but even by attribute element state can be considered as checked/not
			//    if manipulated by hand, also val/props are changed, that is why element persist programmatic changes of state from parent
			//    this is desired behaviuor in this case 
			scope_ancestors.trigger('change'); // needs be triggered if changed programatically
		});

		// reaguje aj na programaticku zmenu
		list_items.on('change', function() { 
			var is_checked = $(this).is(':checked');
			// budu updatovane aj "rodicovske" premene 'currentPageData' a 'data'
			totok.FX.updateCheckboxState(
				totok.currentCheckboxes,
				$(this).attr('id').replace('task-', ''),
				is_checked
			);

			totok.commitToStore();
		});
	},

	removeCheckboxes: function() {
		$(document).find('input.git-taskchecker-checkbox').remove();
	},

	resetCheckboxes: function() {

	},

	commitToStore: function() {
		console.log(this.currentCheckboxes);
		console.log(this.currentPageData);
		console.log(this.data);

		chrome.runtime.sendMessage({
			method: "updateLocalStorage",
			key: "pages",
			data: compressData(this.data)
		}, function(response) {
	  		console.log("sent to store");
		});
	}

}



var C = new Content();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	var rm = request.method;
    if (rm == "reRenderPage") {
    	// for refresh after settings change
    	C.init();
    } else if (rm == "removeCheckboxes") {
    	// just hide them
    	C.removeCheckboxes();
    } else if (rm == "resetCheckboxes") {
    	// reset all to FALSE
    	C.resetCheckboxes();
    }
});
