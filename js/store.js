/* FORMAT

localStorage.pages = 
	[
		{
			id: <md5 hash>,
			data: {
				enabled: <boolean>,
				checkboxes: [
					{
						id: <md5 hash>,
						data: {
							enabled: <boolean>,
							note_text: <text>
						}
					}
				]
			}
		}
	]

*/

function Store(json_source=null, url=null) {
	this.FX = new StoreFunctions();
	this.store;
	this.json_source = json_source;
	this.pages;
	this.currentPage;
	this.current_page_url = url;
	this.current_page_hash;
	this.pageCheckboxes;
	this.storeTimeouter;
	this.store_wait_time = 250;
	this.load();
	this.init();
}

Store.prototype = {
	constructor: Store,

	load: function() {
		if (this.json_source !== null) {
			// passed json as parameter - contentscript issue not able to see local store of extension
			this.store = this.json_source;
		} else {
			this.store = localStorage.getItem('pages');
			if ((this.store === null) || (this.store === undefined)) {
				// create localStorage if not exist
				localStorage.setItem('pages', this.FX.compress([]));
				this.store = localStorage.getItem('pages');
			}
		}
		if (this.current_page_url === null) {
			// store volana z content scriptov
			this.current_page_url = window.location.href;
		} 
	},

	init: function() {
		this.pages = this.FX.decompress(this.store);
		this.current_page_hash = this.FX.currentPageHash(this.current_page_url);
		this.currentPage = this.FX.getData(this.pages, this.current_page_hash);
		if (this.isActiveCurrentPage()) { this.pageCheckboxes = this.currentPage.data.checkboxes; }
	},

	existCurrentPage: function() {
		return (this.currentPage === null) ? false : true; 
	},

	isActiveCurrentPage: function() {
		if (this.existCurrentPage()) {
			return this.getCurrentPage().data.enabled;
		} else {
			return false;
		}
	},

	getCurrentPage: function() {
		return this.currentPage;
	},

	getOrCreateCurrentPage: function() {
		if (this.existCurrentPage()) {
			return this.currentPage;
		} else {
			var tmp = this.FX.setData(
				this.pages,
				this.current_page_hash,
				{
					enabled: false,
					checkboxes: []
				}
			);
			this.currentPage = tmp;
			return tmp;
		}
	},

	switchCurrentPageActive: function() {
		if (this.existCurrentPage()) {
			this.getCurrentPage().data.enabled = !this.getCurrentPage().data.enabled;
		}
	},

	getCheckboxes: function() {
		return this.pageCheckboxes;
	},

	getCheckbox: function(id) {
		return this.FX.getData(this.pageCheckboxes, id);
	},

	getOrCreateCheckbox: function(id) {
		var chkbx = this.getCheckbox(id);
		if (chkbx !== null) {
			return chkbx;
		} else {
			return this.FX.setData(
				this.pageCheckboxes,
				id,
				{
					enabled: false,
					text: null
				}
			);
		}
	},

	isCheckboxEnabled: function(id) {
		var chkbx = this.getCheckbox(id);
		if (chkbx === null) {
			return false;
		} else {
			return this.getCheckbox(id).data.enabled;
		}
	},

	setCheckbox: function(id, state) {
		var chkbx = this.getOrCreateCheckbox(id);
		chkbx.data.enabled = state;
	},

	isAnyText: function(id) {
		var chkbx = this.getCheckbox(id);
		if (chkbx === null) {
			return false;
		} else {
			var txt =  this.getCheckbox(id).data.text;
			if ((txt === undefined)||(txt === null)||(txt == "")) {
				return false;
			} else {
				return txt;
			}
		}
	},

	setText: function(id, text) {
		var chkbx = this.getOrCreateCheckbox(id);
		chkbx.data.text = text;
	},

	commit: function(callback) {
		var totok = this;
		clearTimeout(totok.storeTimeouter);

		totok.storeTimeouter = setTimeout(function() { 
			chrome.runtime.sendMessage({
				method: "updateLocalStorage",
				key: "pages",
				data: totok.FX.compress(totok.pages)
			}, function(response) {
				console.log("values commited to store");
		  		if (typeof callback == "function") {
					callback();
				}
			});
		}, totok.store_wait_time);
	}

}


