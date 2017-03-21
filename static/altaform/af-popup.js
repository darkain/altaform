'use strict';


var popsettings = {
	width:		900,
	height:		600,
	minWidth:	600,
	minHeight:	350,
};


var popup = function(url, title, data) {
	if (typeof(title)==='object') {
		title = $('#' + $(title).attr('aria-describedby')).children().html()
	}

	$('#popup-window')
		.dialog('option', 'title', title)
		.dialog('open')
		.dialog('option', 'buttons', {'Close':popdown});

	popload(url, data);
};


var popdown = function() {
	$('#popup-window').dialog('close');
};


var popload = function(url, data) {
	$('#popup-window').html('<div class="loading"></div>');

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
	$('#popup-window').html(data);
	$('#popup-window .af-default-focus').first().focus();
};


var popserial = function() {
	return $('#popup-window').afSerialize();
};


var poppost = function(url, callback) {
	$.post(url, popserial(), callback?callback:popupdate).fail(poperror);
};


var popbuttons = function(buttons, append) {
	if (append  ||  arguments.length < 2) {
		buttons = $.extend(
			{}, buttons,
			$('#popup-window').dialog('option', 'buttons')
		);
	}
	$('#popup-window').dialog('option', 'buttons', buttons);
};


var poptitle = function(title, append) {
	if (append) title = $('#popup-window').dialog('option', 'title') + ' - ' + title;
	$('#popup-window').dialog('option', 'title', title);
};


var poperror = function(xhr, selector){
	console.log(xhr);
	$(selector || '#popup-window').html(xhr.responseText);
};


$(function(){
	$('#popup-window').dialog($.extend(popsettings, {
		autoOpen:false,
		buttons:{'Close':popdown},
		modal:true,
		title:'',
		show:	{ effect:'fade', duration:350 },
		hide:	{ effect:'fade', duration:350 },
		open:	function(event,ui) { $('html,body').css('overflow','hidden'); },
		close:	function(event,ui) { $('html,body').css('overflow','initial'); $(this).html(''); }
	}));
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
		$(this).click(function(){
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
