'use strict';


var popsettings = {
	width:		900,
	height:		600,
	minWidth:	600,
	minHeight:	350,
};


var popselect = function(selector) {
	return $(selector || '#popup-window');
}


var ispopup = function(selector) {
	return popselect().hasClass('ui-dialog-content');
};


var popup = function(url, title, data) {
	if (!ispopup()) return;

	if (typeof(title)==='object') {
		title = $('#' + $(title).attr('aria-describedby')).children().html()
	}

	popselect()
		.dialog('option', 'title', title)
		.dialog('open')
		.dialog('option', 'buttons', {'Close':popdown});

	popload(url, data);
};


var popdown = function() {
	if (!ispopup()) return;
	popselect().dialog('close');
};


var popload = function(url, data) {
	popselect().html('<div class="loading"></div>');

	if (data == null) data = {};
	data.jq = 1;

	$.post(url, data, function(data, status, xhr){
		if (status == 'error') return poperror(xhr);
		popupdate(data);
	}).fail(function(xhr){
		poperror(xhr);
	});
};


var popupdate = function(data) {
	data = data.trim();
	if (data == 'AF-OK') return popdown();
	if (data == 'AF-REFRESH') { popdown(); return refresh() };
	popselect().html(data);
	popselect().find('.af-default-focus').first().focus();
};


var popserial = function() {
	return popselect().afSerialize() + '&jq=1';
};


var poppost = function(url, callback) {
	$.post(url, popserial(), callback?callback:popupdate).fail(poperror);
};


var popbuttons = function(buttons, append) {
	if (!ispopup()) return;

	if (buttons === 'reset') {
		buttons	= {'Close':popdown};

	} else if (append  ||  arguments.length < 2) {
		buttons = $.extend(
			{}, buttons,
			popselect().dialog('option', 'buttons')
		);
	}

	popselect().dialog('option', 'buttons', buttons);
};


var poptitle = function(title, append) {
	if (!jQuery.ui) return;

	if (append) {
		title = popselect().dialog('option', 'title') + ' - ' + title;
	}

	popselect().dialog('option', 'title', title);
};


var poperror = function(xhr, selector){
	console.log(xhr);
	popselect(selector).html(xhr.responseText);
};


$(function(){
	if (!jQuery.ui) return;

	popselect().dialog($.extend(popsettings, {
		autoOpen:false,
		modal:true,
		title:'',
		show:	{ effect:'fade', duration:350 },
		hide:	{ effect:'fade', duration:350 },
		open:	function(event,ui) { $('html,body').css('overflow','hidden'); },
		close:	function(event,ui) { $('html,body').css('overflow','initial'); $(this).html(''); }
	}));

	popbuttons('reset');
});


(function($) {
	$.fn.afpopup = function(url, options) {
		var bg, that = this;

		$('.afpopup-background').remove();

		$('body').append(
			bg = $('<div class="afpopup-background"></div>').click(function(){
				$(that).dialog('close')
			})
		);

		$(that).attr('tabindex', 9999).load(url).dialog($.extend({}, {
			create: function() {
				$(that).parent().css('position', 'fixed');
				$('html,body').css('overflow', 'hidden');
			},

			open: function() {
				$(that).focus();
			},

			close: function() {
				$('html,body').css('overflow', 'visible');
				bg.remove();
				$(that).html('').dialog('destroy');
			}
		}, options));
	};


	$.fn.afpoppost = function(url) {
		var post = url;

		$(this).click(function(event){
			event.preventDefault();

			var data = popserial();

			var name = $(this).attr('name');
			if (name) {
				data += '&' + encodeURIComponent(name);
				data += '=' + encodeURIComponent($(this).val());
			}

			$.post(post, data, popupdate).fail(poperror);
		});
	};


	$.afnotice = function(text, title) {
		$('#af-notice')
		.text(text)
		.addClass('larger')
		.dialog({
			width:	600,
			height:	150,
			title:	title,
			modal:	true,

			buttons: [{
				text: 'Close',
				click: function(){
					$(this).dialog('close');
				}
			}]
		});
	};
})(jQuery);
