var af_sidebar_loader	= false;
var af_sidebar_open		= {};
var af_sidebar_url		= document.location.toString();


var af_sidebar_ajax = function(event, url, auto) {
	if (event) {
		if (event.which != 1) return false;
		if (af_sidebar_loader) af_sidebar_loader.abort();
		event.preventDefault();
		event.stopPropagation();
	}

	url = url.trim();
	if (url == ''  ||  url == '#'  ||  url == af_sidebar_url) return false;

	$('#af-sidebar-page').html('').scrollTop(0).scrollLeft(0);

	history_block = true;

	if (!auto) History.pushState(null, document.title, url);

	af_sidebar_loader = $.ajax({
		url: url + (url.indexOf('?') == -1 ? '?jq=1' : '&jq=1'),
		success: function(data) {
			$('#af-sidebar-page').html(data);
			af_sidebar_load();
		},
		error: function(xhr) {
			$('#af-sidebar-page').html(xhr.responseText);
			af_sidebar_load();
		},
	});

	history_block = false;

	return true;
}


var af_sidebar_load = function() {
	$('#af-sidebar-page a').each(function(id, item) {
		if ($(item).hasClass('af-sidebar-link')) return;

		$(item).addClass('af-sidebar-link').click(function(event) {
			af_sidebar_ajax(event, $(this).prop('href'));
		});
	});
}


var af_sidebar_init = function() {
	af_sidebar_open = af_storage_read('af_sidebar_open');


	$('#af-sidebar-list a').click(function(event){
		if (!af_sidebar_ajax(event, $(this).prop('href'))) return;

		$('.af-sidebar-selected').removeClass('af-sidebar-selected');
		$(this).addClass('af-sidebar-selected');

		$('#af-sidebar-page').html('').scrollTop(0).scrollLeft(0);
	});



	$('#af-sidebar-list div span').click(function() {
		var parent = $(this).parent();

		if (parent.children('div,a,hr').is(':animated')) return;

		parent.addClass('af-sidebar-open');

		var visible = !parent.children('div,a,hr').is(':visible');

		af_sidebar_open['menu-'+parent.data('af-sidebar-menu')] = visible ? 1 : 0;
		af_storage_write('af_sidebar_open', af_sidebar_open);

		$(this).children('i').css('transform', visible ? 'rotate(90deg)' : '');

		parent.children('div,a,hr').slideToggle(function() {
			if (visible) {
				$(this).css('display','block');
			} else {
				parent.removeClass('af-sidebar-open');
			}
		});
	});


	$('#af-sidebar-list div').children('div,a,hr').hide();

	for (var prop in af_sidebar_open) {
		if (!af_sidebar_open[prop]) continue;
		prop = prop.replace('menu-', '');
		var parent = $('#af-sidebar-parent div[data-af-sidebar-menu='+prop+']');
		parent.addClass('af-sidebar-open');
		parent.children('span').children('i').css('transform', 'rotate(90deg)');
		parent.children('div,a,hr').css('display','block');
	}


	$('#af-sidebar-list').show();

};
