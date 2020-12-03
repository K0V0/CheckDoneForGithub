
function ContentFunctions() {
	this.init();
}

ContentFunctions.prototype = {
	constructor: ContentFunctions,

	init: function() {

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
			//prep_elem.prop('checked', checked);
			// attr better
			prep_elem.attr('checked', checked);
		}
		elem.css({ 'position':'relative' });
		elem.prepend(prep_elem);
	}

}