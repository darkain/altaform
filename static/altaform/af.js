'use strict';


//Refresh the current page!
var refresh = function() { document.location.reload(true); };


//Redirect to new URL
var redirect = function(url) { document.location=url; };


//Test if a given value is a number
var isNumber = function(n) { return !isNaN(parseFloat(n)) && isFinite(n); };


//Select an item from the sidebar
var afSidebar = function(item) {
	item = String(item).trim();
	$('.cpn-profile-sidebar-selected').removeClass('cpn-profile-sidebar-selected');
	$('.cpn-profile-sidebar-item:contains("'+item+'")').addClass('cpn-profile-sidebar-selected');
	if (typeof afmore === 'function') afmore();
}


//Capitalize first character in a string
String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}


//Escape a selector
String.prototype.escape = function() {
	return this.replace(/(:|\.|\[|\]|\/|\s|,|=)/g, '\\$1');
}


//Strip HTML characters
String.prototype.striptags = function() {
	return $(this).text();
};


//Delayed onload
$(function(){

	//Default selected item
	$('.af-default-focus').first().focus();

	//Select sidebar item
	afSidebar(document.title.split(' - ')[0]);

});
