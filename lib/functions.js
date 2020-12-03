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