
(function($) {
	var body_event;

	var droplist_body = function() {
		$('.droplist_active').removeClass('droplist_active');
		$('body').unbind('click', droplist_body);
	};

	$.fn.droplist = function() {
		$(this).each(function(index, dom_select) {
			if (!$(dom_select).hasClass('droplist_select')) {

				var ul = $('<ul class="droplist"></ul>').insertAfter(dom_select);
				$(dom_select).children().each(function(index, item){
					ul.append('<li>' + $(item).text() + '</li>');
				});

				var index = $(this).prop("selectedIndex");
				ul.children('li:not(":eq('+index+')")').addClass('unselected');
				ul.children('li:eq('+index+')').addClass('selected');

				ul.find('li').click(function(event){
					var ul = $(this).parent();
					if (!ul.hasClass('droplist_active')) return;

					event.stopPropagation();
					droplist_body();

					var select = ul.prev('select:first');
					$(this).removeClass('unselected').addClass('selected');
					$(this).siblings('li').addClass('unselected').removeClass('selected');
					var index = $(this).index();

					select.children('option:selected').removeAttr('selected');
					select.find('option').eq(index).prop('selected',true);
					select.change();
				});

				ul.click(function(event) {
					event.stopPropagation();
					var open	= ul.hasClass('droplist_active');
					var width	= ul.width();
					droplist_body();
					if (open) return;
					$('body').bind('click', droplist_body);
					$(this)
						.addClass('droplist_active')
						.scrollTop(0)
						.scrollTop( $(this).children('.selected').position().top - 50 )
						.css('min-width', width+'px');
				});
			}
		});

		$(this).css('display', 'none');
		$(this).addClass('droplist_select');
		return this;
	};
})(jQuery);
