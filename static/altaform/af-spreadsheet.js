'use strict';


(function($){
	$.fn.afSelect = function(event) {
		event.preventDefault();
		event.stopPropagation();
		var item = $(this);
		if (!item.length) return false;
		item.focus().select();
		return true;
	};


	$.fn.prevRow = function(selector, sel_row, sel_cell, direction) {
		sel_row		= sel_row	|| 'TR'
		sel_cell	= sel_cell	|| 'TD,TH';

		var cell	= $(this).is(sel_cell) ? $(this) : $(this).closest(sel_cell);
		var row		= cell.closest(sel_row);
		var index	= cell.find(selector).index(this);
		var item	= row.find(sel_cell).index(cell);

		while (row = direction ? row.next(sel_row) : row.prev(sel_row)) {
			if (row.length < 1) break;
			var thing = row.find(sel_cell).eq(item).find(selector);
			if (thing.eq(index).length)	return thing.eq(index);
			if (thing.last().length)	return thing.last();
		}

		return $([]);
	};


	$.fn.nextRow = function(selector, sel_row, sel_cell) {
		return $(this).prevRow(selector, sel_row, sel_cell, true);
	};


	$.fn.prevInRow = function(selector, row) {
		selector = selector || $(this).prop('nodeName');
		var set = $(this).closest(row||'TR').find(selector);
		var index = set.index(this);
		return set.slice(index-1, index);
	};


	$.fn.nextInRow = function(selector, row) {
		selector = selector || $(this).prop('nodeName');
		var set = $(this).closest(row||'TR').find(selector);
		var index = set.index(this);
		return set.slice(index+1, index+2);
	};


	$.fn.afSpreadsheet = function(options) {
		//TODO: DONT DOUBLE ADD
		//TODO: $(this) MAY BE A COLLECTION, NOT A SINGLE ITEM, SO LOOP IT!

		var settings = $.extend({
			selector:	'select,input,a',
			row:		'TR',
			cell:		'TD,TH',
			column:		false,
			enter:		true,
		}, options);

		$(this).addClass('afSpreadsheet');

		$(this).find(settings.selector).keydown(function(event) {
			var autocomplete = $(this).autocomplete('instance');
			if (autocomplete) {
				if ($(this).autocomplete('widget').is(':visible')) return;
			}

			//enter
			if (event.which == 13) {
				if (settings.enter) {
					$(this).nextRow(
						settings.selector,
						settings.row,
						settings.cell
					).afSelect(event);
				}

			//up
			} else if (event.which == 38) {
				if (settings.column) {
					$(this).prevInRow(
						settings.selector,
						settings.row
					).afSelect(event);
				} else {
					$(this).prevRow(
						settings.selector,
						settings.row,
						settings.cell
					).afSelect(event);
				}

			//down
			} else if (event.which == 40) {
				if (settings.column) {
					$(this).nextInRow(
						settings.selector,
						settings.row
					).afSelect(event);
				} else {
					$(this).nextRow(
						settings.selector,
						settings.row,
						settings.cell
					).afSelect(event);
				}

			//left
			} else if (event.which == 37) {
				if ($(this).prop('nodeName') == 'INPUT'  &&  ($(this).attr('type')=='text' || $(this).attr('type')=='password')) {
					if ($(this)[0].selectionStart == 0  &&  $(this)[0].selectionEnd == 0) {
						$(this).prevInRow(
							settings.selector,
							settings.row
						).afSelect(event);
					}
				} else {
					$(this).prevInRow(
						settings.selector,
						settings.row
					).afSelect(event);
				}

			//right
			} else if (event.which == 39) {
				if ($(this).prop('nodeName') == 'INPUT'  &&  ($(this).attr('type')=='text' || $(this).attr('type')=='password')) {
					var len = $(this).val().length;
					if ($(this)[0].selectionStart == len  &&  $(this)[0].selectionEnd == len) {
						$(this).nextInRow(
							settings.selector,
							settings.row
						).afSelect(event);
					}
				} else {
					$(this).nextInRow(
						settings.selector,
						settings.row
					).afSelect(event);
				}

			}
		}).on('autocompleteopen', function(event) {
			if (!$(this).is(':focus')) {
				$(this).autocomplete('close');
			}
		});

		return this;
	};
}(jQuery));
