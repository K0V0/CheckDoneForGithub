/*
manipuluje s html stranky
nema pristup k html rozsirenia samotneho (popup)
*/

function Content() {
	this.autosaveTimeDelay = 1000;
	this.FX = new ContentFunctions();
	this.STORE;
	this.mdContainer;
	this.listItems;
	this.addNoteButtons;
	this.noteAreas;
	this.init();
}

Content.prototype = {
	constructor: Content,

	init: function() {
		var totok = this;
		chrome.runtime.sendMessage({method: "getLocalStorage", key: "pages"}, function(response) {
	  		totok.STORE = new Store(response.data);
	  		if (totok.STORE.isActiveCurrentPage()) {
				totok.displayCheckboxes();
			} else {
				totok.removeCheckboxes();
			}
		});
	},

	displayCheckboxes: function() {
		var totok = this;
		totok.mdContainer = $(document).find('#readme');

		// generate unique hashes for all li elements based on its text
		totok.mdContainer.find('li').each(function() {
			totok.FX.addMD5id($(this));
		});

		// draw checkbox with belonging state according to data from store
		totok.mdContainer.find('li').each(function() {
			totok.FX.appendNoteButton($(this));
			totok.FX.appendCheckbox(
				$(this), 
				totok.STORE.isCheckboxEnabled($(this).attr('id'))
			);
		});

		totok.listItems = totok.mdContainer.find('input[type=checkbox].git-taskchecker-checkbox');
		totok.addNoteButtons = totok.mdContainer.find('a.git-taskchecker-add-note');
		totok.noteAreas = totok.mdContainer.find('textarea.git-taskchecker-note-area'); // element appended by user action too

		totok.listItems.on('click', function() {
			var	scope_ancestors = $(this).siblings().find('input[type=checkbox].git-taskchecker-checkbox');
			scope_ancestors.attr('checked', $(this).is(':checked')); // new state already there after click even if inside this onclick handler
			// ^^ manipulates atribute of element, not val/props, but even by attribute element state can be considered as checked/not
			//    if manipulated by hand, also val/props are changed, that is why element persist programmatic changes of state from parent
			//    this is desired behaviuor in this case 
			scope_ancestors.trigger('change'); // needs be triggered if changed programatically
		});

		totok.addNoteButtons.on('click', function(e) {
			e.preventDefault();
			totok.FX.appendNoteArea($(this).parent('li'));
		});

		// reaguje aj na programaticku zmenu
		totok.listItems.on('change', function() { 
			totok.STORE.setCheckbox(
				$(this).attr('id').replace('task-', ''),
				$(this).is(':checked')
			);
			totok.STORE.commit();
		});

		// do not work on elements appended by user action(s)
		/*totok.noteAreas.on('change', function() {
			console.log("idee");
		});*/

		$(document).frequentFireLimit('input', totok.autosaveTimeDelay, 'textarea.git-taskchecker-note-area', function() {
			console.log("ideffffffe");
		});
	},

	removeCheckboxes: function() {
		// means removes only elements from page, data of checkboxes are persisted
		// data are persisted if in future turn then user on
		$(document).find('input.git-taskchecker-checkbox').remove();
		$(document).find('a.git-taskchecker-add-note').remove();
	},

	resetCheckboxes: function() {
		this.listItems.attr('checked', false);
		this.listItems.trigger('change');
		this.STORE.commit();
	},
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





