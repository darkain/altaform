//Refresh the current page!
refresh = function() { location.reload(true); };

//Redirect to new URL
redirect = function(url) { document.location=url; };

//Test if a given value is a number
isNumber = function(n) { return !isNaN(parseFloat(n)) && isFinite(n); };

//Select an item from the sidebar
afSidebar = function(item) {
	item = item.trim();
	$('.cpn-profile-sidebar-selected').removeClass('cpn-profile-sidebar-selected');
	$('.cpn-profile-sidebar-item:contains("'+item+'")').addClass('cpn-profile-sidebar-selected');
	afmore();
}

afEscape = function(item) {
	return item.replace(/(:|\.|\[|\]|\/|,|=)/g, '\\$1');
}

//Strip HTML characters
strip_tags = function(html) { return $(html).text(); };

$(function(){afSidebar(document.title.split(' - ')[0]);});

//Capitalize first character in a string
String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

//Default selected item
$(function(){ $('.af-default-focus').first().focus(); });
