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
};


//Capitalize first character in a string
if (!String.prototype.capitalize) {
	String.prototype.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};
}


//Escape a selector
if (!String.prototype.escape) {
	String.prototype.escape = function() {
		return this.replace(/(:|\.|\[|\]|\/|\s|,|=)/g, '\\$1');
	};
}


//Strip HTML characters
if (!String.prototype.striptags) {
	String.prototype.striptags = function() {
		return $(this).text();
	};
}


//Trim strings http://stackoverflow.com/questions/498970/trim-string-in-javascript
if (!String.prototype.trim) {
	String.prototype.trim=function() {
		return this.replace(/^\s+|\s+$/g, '');
	};

	String.prototype.ltrim=function(){
		return this.replace(/^\s+/,'');
	};

	String.prototype.rtrim=function() {
		return this.replace(/\s+$/,'');
	};

	String.prototype.fulltrim=function() {
		return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
	};
}


//Delayed onload
$(function(){

	//Default selected item
	$('.af-default-focus').first().focus();

	//Select sidebar item
	afSidebar(document.title.split(' - ')[0]);

});
