/*
	universal functions that should be accesible in popup, background and content part of application  
*/

function stripUrlParams (url) {
	var index = 0;
	var newURL = url;
	index = url.indexOf('?');
	if(index == -1){
	    index = url.indexOf('#');
	}
	if(index != -1){
	    newURL = url.substring(0, index);
	}
	return newURL;
}

function uncompressData(json_data) {
	return JSON.parse(json_data);
}

function compressData(object) {
	return JSON.stringify(object);
}

function getData(obj, id) {
	for (var i=obj.length-1; i>=0; i--) {
		if (obj[i].id == id) {
			return obj[i];
		}
	}
}

function pushOrUpdateData(obj, id) {

}