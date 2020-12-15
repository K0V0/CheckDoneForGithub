
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
		elem.prepend(prep_elem);
	},

	appendNoteButton: function(elem, toReset) {
		var reset_class = "";
		if (toReset) { reset_class = "reset"; }
		var prep_elem = $('<a class="git-taskchecker-add-note ' + reset_class + '" id="addnote-' + elem.attr('id') + '" href="#" alt="Add Note(s)" title="Add Note(s)"></a>');
		elem.prepend(prep_elem);
	},

	appendNoteArea: function(elem, hasText) {
		if (hasText) {
			var txt = "";
			if (typeof(hasText) != "boolean") { txt = hasText; }
			var app_elem = $('<textarea class="git-taskchecker-note-area">' + txt + '</textarea>');
			//elem.append('<br>');
			elem.append(app_elem);
		}
	},

	removeNoteArea: function(textarea) {
		textarea.val("");
		textarea.trigger('input');
		textarea.parent('li').children('a.git-taskchecker-add-note').removeClass('reset');
		textarea.remove();
	},

	resetCheckbox: function(checkbox) {
		checkbox.attr('checked', false);
		checkbox.prop('checked', false);
		checkbox.trigger('change');
	}

}