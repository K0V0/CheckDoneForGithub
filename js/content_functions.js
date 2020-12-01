
function ContentFunctions() {
	this.timer;
	this.wait_time = 250;
	this.init();
}

ContentFunctions.prototype = {
	constructor: ContentFunctions,

	init: function() {

	},

	currentPageHash: function() {
		return MD5(stripUrlParams(window.location.href));
	},

	isThisPageEnabled: function(store_data) {
		var current_page_hash = this.currentPageHash();
		console.log(current_page_hash);
		for (var i=store_data.length-1; i>=0; i--) {
			if (store_data[i].id == current_page_hash) {
				if (store_data[i].data.enabled === true) {
					return true;
				}
			}
		}
		return false;
	},

	addMD5id: function(elem) {
		var elem_txt = elem.text();
		var md5 = MD5(elem_txt);
		elem.attr('id', md5);
	},

	appendCheckbox: function(elem, checked) {
		var prep_elem = $('<input type="checkbox" id="task-' + elem.attr('id') + '" class="git-taskchecker-checkbox">');
		if (checked === true) {
			// do not add prop when false, children items in list then not manipulable by parent
			prep_elem.prop('checked', checked);
		}
		elem.css({ 'position':'relative' });
		elem.prepend(prep_elem);
	},

	getCheckboxState: function(list, id) {
		var data = getData(list, id);
		if (data === undefined) {
			return false;
		} else {
			return data.data.enabled;
		}
	},

	updateCheckboxState: function(list, id, state) {
		var data = getData(list, id);
		if (data === undefined) {
			list.push({
				id: id,
				data: { enabled: state }
			});
		} else {
			data.data.enabled = state;
		}
	}

}