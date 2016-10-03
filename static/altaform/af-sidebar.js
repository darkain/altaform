//SIDEBAR VARIABLES
var af_sidebar_loader	= false;
var af_sidebar_open		= {};
var af_sidebar_path		= '';



//PROCESS SIDEBAR LOADING OF PAGE
var af_sidebar_ajax = function(event, url, auto) {
	//PREVENT DEFAULT ACTIONS ON ANCHORS
	if (event) {
		if (event.which != 1) return false;
		if (af_sidebar_loader) af_sidebar_loader.abort();
		event.preventDefault();
		event.stopPropagation();
	}

	//IF THIS IS AN EMPTY URL, DO NOTHING
	url = url.trim();
	if (url == ''  ||  url == '#') return false;

	//SCROLL TO TOP/LEFT OF DIV
	$('#af-sidebar-page').html('').scrollTop(0).scrollLeft(0);

	//PREVENT RECURSION
	history_block = true;

	//PUSH URL TO HISTORY STATE
	if (!auto) History.pushState(null, document.title, url);

	//REMOVE OLD HIGHLIGHT FROM SIDEBAR
	$('.af-sidebar-selected').removeClass('af-sidebar-selected');

	//ADD NEW HIGHLIGHT TO SIDEBAR
	$('#af-sidebar-parent a[href="' + url.replace(af_sidebar_path, '') + '"]')
		.addClass('af-sidebar-selected');

	//AJAX REQUEST TO LOAD NEW PAGE
	af_sidebar_loader = $.ajax({
		url: url + (url.indexOf('?')==-1?'?':'&') + 'jq=1&sidebar=1',
		success: function(data) {
			$('#af-sidebar-page').html(data);
			af_sidebar_load();
		},
		error: function(xhr) {
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
			if ($(this).prop('target')) return;
			af_sidebar_ajax(event, $(this).prop('href'));
		});
	});
};



//INITIALIZE SIDEBAR - CALLED FROM PAGE'S TEMPLATE
var af_sidebar_init = function(path) {
	if (af_sidebar_path != '') return;


	//INITIALIZE VARIABLES
	af_sidebar_path = path;
	af_sidebar_open = af_storage_read('af_sidebar_open');


	//OVERWRITE DEFAULT REFRESH RULE
	refresh = function() {
		af_sidebar_ajax(false, document.location, false);
	};


	//OVERWRITE DEFAULT REDIRECT RULE
	redirect = function(url) {
		af_sidebar_ajax(false, url, false);
	};


	//OVERWRITE ANCHOR CLICK HANDLER
	$('#af-sidebar-list a').click(function(event){
		if (!af_sidebar_ajax(event, $(this).prop('href'))) return;
		$('#af-sidebar-page').html('').scrollTop(0).scrollLeft(0);
	});


	//OPEN/CLOSE MENUS ON CLICKING
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


	//HIDE ALL SUBMENUS BY DEFAULT
	$('#af-sidebar-list div').children('div,a,hr').hide();


	//OPEN EACH MENU FROM LOCAL STORAGE INFORMATION
	for (var prop in af_sidebar_open) {
		if (!af_sidebar_open[prop]) continue;
		prop = prop.replace('menu-', '');
		var parent = $('#af-sidebar-parent div[data-af-sidebar-menu='+afEscape(prop)+']');
		parent.addClass('af-sidebar-open');
		parent.children('span').children('i').css('transform', 'rotate(90deg)');
		parent.children('div,a,hr').css('display','block');
	}


	//SHOW THE SIDEBAR
	$('#af-sidebar-list').show();


	//PROCESS INITIAL URL
	af_sidebar_ajax(false, document.location.pathname, true);
};
