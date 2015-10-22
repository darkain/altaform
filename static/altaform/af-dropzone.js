afDropzone = function(form, url, target) {
	new Dropzone(form, {
		url: url,
		thumbnailWidth:200,
		thumbnailHeight:200,
		maxFilesize:32,
		clickable:target,
		dictDefaultMessage:'',
		withCredentials:true,
		init: function() {
			this.on('addedfile', function(file){
				$(file.previewElement).insertAfter(target);
			});
		},
		success: function(file, text) {
			$(text).insertAfter( $(file.previewElement) );
			$(file.previewElement).remove();
		},
		error: function(file, message) {
			alert('File: ' + file.name + '\n\n' + message);
			$(file.previewElement).remove();
		},
	});
}
