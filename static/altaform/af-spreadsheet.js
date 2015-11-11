(function($){
	$.fn.afSelect = function(event) {
		event.preventDefault();
		var item = $(this);
		if (!item.length) return false;
		item.focus().select();
		return true;
	};


	$.fn.prevRow = function(selector, direction) {
		var cell	= $(this).closest('td,th');
		var row		= cell.closest('tr');
		var index	= cell.find(selector).index(this);
		var item	= row.find('td,th').index(cell);
		while (row = direction ? row.next('tr') : row.prev('tr')) {
			if (row.length < 1) break;
			var thing = row.find('td,th').eq(item).find(selector);
			if (thing.eq(index).length)	return thing.eq(index);
			if (thing.last().length)	return thing.last();
		}
		return $([]);
	}


	$.fn.nextRow = function(selector) {
		return $(this).prevRow(selector, true);
	}


	$.fn.prevInRow = function(selector, row) {
		selector = selector || $(this).prop('nodeName');
		row = typeof row !== 'undefined' ? row : 'TR';
		var set = $(this).closest(row).find(selector);
		var index = set.index(this);
		return set.slice(index-1, index);
	}


	$.fn.nextInRow = function(selector, row) {
		selector = selector || $(this).prop('nodeName');
		row = typeof row !== 'undefined' ? row : 'TR';
		var set = $(this).closest(row).find(selector);
		var index = set.index(this);
		return set.slice(index+1, index+2);
	}


	$.fn.afSpreadsheet = function(options) {
		var settings = $.extend({
			selector:	'select,input,a',
			enter:		true,
		}, options);

		$(this).addClass('afSpreadsheet');

		$(this).find(settings.selector).keydown(function(event) {

			//enter
			if (event.which == 13) {
				if (settings.enter) {
					$(this).nextRow(settings.selector).afSelect(event);
				}

			//up
			} else if (event.which == 38) {
				$(this).prevRow(settings.selector).afSelect(event);

			//down
			} else if (event.which == 40) {
				$(this).nextRow(settings.selector).afSelect(event);

			//left
			} else if (event.which == 37) {
				if ($(this).prop('nodeName') == 'INPUT'  &&  ($(this).attr('type')=='text' || $(this).attr('type')=='password')) {
					if ($(this)[0].selectionStart == 0  &&  $(this)[0].selectionEnd == 0) {
						$(this).prevInRow(settings.selector).afSelect(event);
					}
				} else {
					$(this).prevInRow(settings.selector).afSelect(event);
				}

			//right
			} else if (event.which == 39) {
				if ($(this).prop('nodeName') == 'INPUT'  &&  ($(this).attr('type')=='text' || $(this).attr('type')=='password')) {
					var len = $(this).val().length;
					if ($(this)[0].selectionStart == len  &&  $(this)[0].selectionEnd == len) {
						$(this).nextInRow(settings.selector).afSelect(event);
					}
				} else {
					$(this).nextInRow(settings.selector).afSelect(event);
				}

			}
		});

		return this;
	};
}(jQuery));
