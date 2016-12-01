'use strict';


var afmore = function() {
	$('.cpn-more').each(function(index, item){
		if ($(item).hasClass('cpn-more-done')) return;
		$(item).addClass('cpn-more-done');
		$(item).click(function(){
			var add = !$(item).hasClass('cpn-more-show');
			$('.cpn-more-show').removeClass('cpn-more-show');
			if (add) {
				$(item).addClass('cpn-more-show');
				$('#afmore-background').remove();
				var bg = $('<div id="afmore-background"></div>');
				bg.click(function(){ $('.cpn-more-show').click(); });
				$('body').append(bg);
			} else {
				$('#afmore-background').remove();
			}
		});
	});
}

$(afmore);
