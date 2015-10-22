popup = function(url, title) {
	if (typeof(title)==='object') {
		title = $('#' + $(title).attr('aria-describedby')).children().html()
	}

	$('#popup-window')
		.html('')
		.dialog('option', 'title', title)
		.dialog('open')
		.dialog('option', 'buttons', {'Close':function(){$(this).dialog('close');}})
		.load(url, function(text, status, request){
			if (status == 'error') {
				$('#popup-window').html(text);
			}
		});
};

popdown = function() {
	$('#popup-window').dialog('close');
};

popupdate = function(data) {
	$('#popup-window').html(data);
};

popup_buttons = function(buttons, append) {
	if (append) buttons = $.extend({}, buttons, $('#popup-window').dialog('option', 'buttons'));
	$('#popup-window').dialog('option', 'buttons', buttons);
};

popup_title = function(title, append) {
	if (append) title = $('#popup-window').dialog('option', 'title') + ' - ' + title;
	$('#popup-window').dialog('option', 'title', title);
};

$(function(){
	$('#popup-window').dialog({
		autoOpen:false,
		buttons:{"Close":popdown},
		modal:true,
		title:'',
		width:800,
		height:500,
		minWidth:600,
		minHeight:350,
		show: { effect: "fade", duration: 350 },
		hide: { effect: "fade", duration: 350 },
		open: function(event, ui) { $("body").css({ overflow: 'hidden' }) },
		beforeClose: function(event, ui) { $("body").css({ overflow: 'initial' }) },
	});
});


(function($) {
	$.fn.afpopup = function(url, options) {
		var that = this;
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
	}
})(jQuery);


(function($) {
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
	}
})(jQuery);
