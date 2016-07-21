var af_storage_read = function(name) {
	var data = {};
	try {
		data = JSON.parse(localStorage.getItem(name));
		if (typeof data != 'object') data = {};
		if (data == null) data = {};
	} catch (e) {}
	return data;
}

var af_storage_write = function(name, data) {
	localStorage.setItem(name, JSON.stringify(data));
}
