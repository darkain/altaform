(function($) {



$.getSync = function(url, data, success, dataType) {
	return $.ajax({
		url: url,
		data: data,
		success: success,
		dataType: dataType,
		async: false,
	});
}




$.postSync = function(url, data, success, dataType) {
	return $.ajax({
		type: "POST",
		url: url,
		data: data,
		success: success,
		dataType: dataType,
		async: false,
	});
}




//TODO: see if this style sheet is already loaded, and if so, don't load again!
$.afGetStyles = function(url) {
	$('<link>')
		.appendTo($('head'))
		.attr({type:'text/css', rel:'stylesheet'})
		.attr('href', url);
};




$.afGetScript = function(url, p1, p2) {
	var options = $.isFunction(p1) ? {} : p1;
	var success = $.isFunction(p1) ? p1 : p2;
	console.log(url);
	console.log(p1);
	return $.ajax($.extend(options || {}, {
		dataType: 'script',
		//cache: true,
		cache: false,
		url: url,
		success: success,
	}));
}




$.updateClass = function(name, value) {
	// we need invisible container to store additional css definitions
	var parent = $('#af-css-container');
	if (parent.length == 0) {
		parent = $('<div id="af-css-container"></div>');
		parent.hide();
		parent.appendTo('body');
	}

	// and we need one div for each class
	var child = parent.find('div[data-class="' + name + '"]');
	if (child.length == 0) {
		child = $('<div data-class="' + name + '"></div>');
		child.appendTo(parent);
	}

	// append additional style
	child.html('<style>' + name + ' {' + value + '}</style>');
}




//Allow for input serialization from non form elements
$.fn.afSerialize = function() {
	return $(this).find('select, input, textarea, datalist, keygen').serialize();
};




$.fn.afNextInput = function() {
	$(this).each(function(index, item) {
		if ($(item).hasClass('afNextInput')) return;
		$(item).addClass('afNextInput');

		$(item).keyup(function(){
			if ($(item).val().length == $(item).attr('size')) {
				if ($(item).data('val') == $(item).val()) return;
				$(item).data('val', $(item).val());
				$(':input:eq('+($(':input').index(item)+1)+')').focus();
			}
		});

		$(item).change(function(){ $(item).data('val', $(item).val()); })

	});

	return this;
};




$.fn.afSelectOption = function(value) {
	var val = value.trim();
	$(this).each(function(index, item) {
		$(item).children('option').prop('selected', false);
		$(item).children('option').filter(function() {
			return $(this).text().trim() == val;
		}).prop('selected', true);
	});
	return this;
};




$.fn.afClickEdit = function(url, id, callback) {
	$(this).each(function(index, item) {
		item = $(item);
		if (item.hasClass('af-edit-field')) return;
		item.addClass('af-edit-field');

		var input = $('<input class="af-edit-input" type="text" />').insertAfter(item);

		input
		.hide()
		.attr('name', item.data('name'))
		.val(item.text().trim())
		.keypress(function(e){if(e.which==13){$(this).blur()}})

		.blur(function(){
			if (!!$('.ui-autocomplete.ui-widget:visible').length) return;
			if (item.text() != input.val()) {
				item.text( input.val() );
				var thisid = id;
				if (!isNumber(thisid)) thisid = $(item).closest('[data-'+thisid+']').data(id);
				if (typeof url == 'string') {
					$.post(
						url,
						{ id: thisid,	text: input.val() },
						function(data) {
							item.html(data);
							if (typeof callback == 'function') {
								callback.call(this, item, input);
							}
						}
					);
				} else if (typeof url == 'function') {
					url.call(this, input.val());
				}
			}
			input.hide();
			item.show();
		});

		item.click(function(event){
			if (event.which != 1) return;
			event.preventDefault();
			event.stopPropagation();
			var css = [
				'font', 'display', 'width', 'height', 'position', 'left', 'top',
				'right', 'bottom', 'border', 'padding', 'margin', 'float',
				'vertical-align', 'text-align'
			];
			css.forEach(function(attr) {
				input.css( attr, item.css(attr) );
			});
			input.val( item.text().trim().replace(/\s\s+/g, ' ') ).focus();
			item.hide();
		});
	});

	return this;
};


var afResizeBody = false;
$.fn.afResize = function() {
	if (!afResizeBody) afResizeBody = $('<div/>').hide().appendTo('body');
	$(this).each(function(index, item) {
		$(item).on('keyup', function(){
			afResizeBody.css('overflow', 'hidden');
			afResizeBody.css('width', $(this).width());
			afResizeBody.css('margin', $(this).css('margin'));
			afResizeBody.css('padding', $(this).css('padding'));
			afResizeBody.css('line-height', $(this).css('line-height'));
			afResizeBody.css('font-size', $(this).css('font-size'));
			afResizeBody.css('word-wrap', $(this).css('word-wrap'));
			afResizeBody.html( $(this).val().replace(/\n/g, '<br/>') +  '<br/>' );
			$(this).css('height', afResizeBody.outerHeight());
		});
	});
	return this;
};


})(jQuery);
