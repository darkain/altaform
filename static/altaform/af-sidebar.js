'use strict';


//SIDEBAR VARIABLES
var af_sidebar_loader	= false;
var af_sidebar_open		= {};
var af_sidebar_path		= '';



//PROCESS SIDEBAR LOADING OF PAGE
var af_sidebar_ajax = function(event, url, auto, nopush) {
	//IF THIS IS AN EMPTY URL, DO NOTHING
	if (url == null) return false;
	url = String(url).trim();
	if (!url  ||  url == '#') return false;

	//PREVENT DEFAULT ACTIONS ON ANCHORS
	if (event) {
		if (event.which != 1) return false;
		if (af_sidebar_loader) af_sidebar_loader.abort();
		event.preventDefault();
		event.stopPropagation();
	}

	//REMOVE OLD HIGHLIGHT FROM SIDEBAR
	$('.af-sidebar-selected').removeClass('af-sidebar-selected');

	//ADD NEW HIGHLIGHT TO SIDEBAR
	var item = $('#af-sidebar-parent a[href="' + url.replace(af_sidebar_path, '') + '"]');
	item.addClass('af-sidebar-selected');

	//OPEN SIDEBAR MENUS
	item = item.parent();
	while (item && item.length) {
		if (item.attr('id') === 'af-sidebar-list') break;
		af_sidebar_expand(item);
		item = item.parent();
	}

	//SHOULD WE AUTO-LOAD CONTENT, OR JUST PROCESS THE CONTENT WE ALREADY HAVE
	if (auto) return af_sidebar_load();

	//SCROLL TO TOP/LEFT OF DIV
	$('#af-sidebar-page').html('').scrollTop(0).scrollLeft(0);

	//PREVENT RECURSION
	if (!nopush) history_block = true;

	//PUSH URL TO HISTORY STATE
	History.pushState(null, document.title, url);

	//AJAX REQUEST TO LOAD NEW PAGE
	af_sidebar_loader = $.ajax({
		url:		url,
		data:		{jq:1, sidebar:1},

		success:	function(data) {
			$('#af-sidebar-page').html(data);
			af_sidebar_load();
		},

		error:		function(xhr) {
			$('#af-sidebar-page').html(xhr.responseText);
			af_sidebar_load();
		},
	});

	//PREVENT RECURSION
	history_block = false;

	return true;
};



//OVERWRITE ANCHOR CLICK HANDLER
var af_sidebar_load = function() {
	$('#af-sidebar-page a').each(function(id, item) {
		if ($(item).hasClass('af-sidebar-link')) return;

		$(item).addClass('af-sidebar-link').click(function(event) {
			if ($(this).attr('target')) return;
			af_sidebar_ajax(event, $(this).attr('href'));
		});
	});

	return true;
};



//EXPAND A MENU ITEM
var af_sidebar_expand = function(item, collapse) {
	if (collapse) {
		item.removeClass('af-sidebar-open');
		item.addClass('af-sidebar-closed');
		item.children('span').children('i').css('transform', '');
	} else {
		item.addClass('af-sidebar-open');
		item.removeClass('af-sidebar-closed');
		item.children('span').children('i').css('transform', 'rotate(90deg)');
	}
};



//INITIALIZE SIDEBAR - CALLED FROM PAGE'S TEMPLATE
var af_sidebar_init = function(path, auto) {
	if (af_sidebar_path != '') return;


	//INITIALIZE VARIABLES
	af_sidebar_path = path;
	af_sidebar_open = af_storage_read('af_sidebar_open');


	//OVERWRITE DEFAULT REFRESH RULE
	refresh = function() {
		af_sidebar_ajax(false, document.location);
	};


	//OVERWRITE DEFAULT REDIRECT RULE
	redirect = function(url) {
		af_sidebar_ajax(false, url);
	};


	//OVERWRITE ANCHOR CLICK HANDLER
	$('#af-sidebar-list a').click(function(event){
		if ($(this).attr('target')) return;
		if (!af_sidebar_ajax(event, $(this).attr('href'))) return;
		$('#af-sidebar-page').html('').scrollTop(0).scrollLeft(0);
	});


	//OPEN/CLOSE MENUS ON CLICKING
	$('#af-sidebar-list div span').click(function() {
		var parent = $(this).parent();



		var visible = !parent.hasClass('af-sidebar-open');

		af_sidebar_open['menu-'+parent.data('af-sidebar-menu')] = visible ? 1 : 0;
		af_storage_write('af_sidebar_open', af_sidebar_open);

		$(this).children('i').css('transform', visible ? 'rotate(90deg)' : '');

		if (visible) {
			parent.addClass('af-sidebar-open');
			parent.removeClass('af-sidebar-closed');
		} else {
			parent.removeClass('af-sidebar-open');
			parent.addClass('af-sidebar-closed');
		}


	//OPEN EACH MENU FROM LOCAL STORAGE INFORMATION
	for (var prop in af_sidebar_open) {
		if (!af_sidebar_open[prop]) continue;
		af_sidebar_expand($('#af-sidebar-parent div[data-af-sidebar-menu='
			+ prop.replace('menu-', '').escape() + ']'
		));
	}


	//SHOW THE SIDEBAR
	$('#af-sidebar-list').show();


	//PROCESS INITIAL URL
	af_sidebar_ajax(false, document.location.pathname, auto, true);
};
