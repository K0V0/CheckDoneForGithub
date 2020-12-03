function StoreFunctions() {
	this.init();
}

StoreFunctions.prototype = {
	constructor: StoreFunctions,

	init: function() {

	},

	compress: function(object) {
		return JSON.stringify(object);
	},

	decompress: function(json) {
		return JSON.parse(json);
	},

	currentPageHash: function(url) {
		return MD5(stripUrlParams(url));
	},

	getData: function(obj, id) {
		var ret = null;
		for (var i=obj.length-1; i>=0; i--) {
			if (obj[i].id == id) {
				ret = obj[i];
			}
		}
		return ret;
	},

	setData: function(obj, id, data) {
		var res = this.getData(obj, id);
		if (res === null) {
			var tmp = {
				id: id,
				data: data
			};
			obj.push(tmp);
			return tmp;
		} else {
			res.data = data;
			return res;
		}
	}
}