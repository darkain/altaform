'use strict';


//Test if html5 history support exists or not
var hasHistory = function() { return !!(window.history && window.history.pushState) };

//AJAX page changing stuffs
var history_ready = false;
var history_block = false;
var history_location = document.location.toString();


var afhistory = function() {
	History.Adapter.bind(window, 'statechange', function(){
		if (!hasHistory()) return;

		$('.cpn-profile-sidebar-selected').removeClass('cpn-profile-sidebar-selected');

		var state = History.getState().cleanUrl;
		console.log(state);

		var start	= state.indexOf('/', 10) + 1;
		var end		= state.indexOf('/', start);
		var part	= state.substr(start, end-start);

		if (state != history_location) history_ready = true;
		if (!history_ready  ||  history_block) return;

		$('#cpn-profile-body')
			.html('<div class="cpn-loading"></div>')
			.load(state + '?jq=1', function(response, status, xhr){
				afSidebar(document.title.split(' - ')[0]);
				$(this).html( xhr.responseText );
				$('.cpn-comment-new input').afNewComment();
			});

		if (typeof ga !== 'undefined') ga('send', 'pageview', location.pathname);
	});
}
