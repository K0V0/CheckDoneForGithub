
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
		var prep_elem = $('<input type="checkbox" id="task-' + elem.attr('id') + '" class="git-taskchecker-checkbox" alt="CheckBox" title="CheckBox">');
		if (checked === true) {
			// do not add prop when false, children items in list then not manipulable by parent
			//prep_elem.prop('checked', checked);
			// attr better
			prep_elem.attr('checked', checked);
		}
		//elem.css({ 'position':'relative' });
		elem.prepend(prep_elem);
	},

	appendNoteButton: function(elem) {
		var prep_elem = $('<a class="git-taskchecker-add-note" id="addnote-' + elem.attr('id') + '" href="#" alt="Add Note(s)" title="Add Note(s)">+</a>');
		elem.prepend(prep_elem);
	},

	appendNoteArea: function(elem) {
		var app_elem = $('<textarea class="git-taskchecker-note-area"></textarea>');
		elem.append('<br>');
		elem.append(app_elem);
	}

}