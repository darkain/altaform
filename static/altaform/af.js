//Refresh the current page!
refresh = function() { location.reload(true); };

//Redirect to new URL
redirect = function(url) { document.location=url; };

//Test if a given value is a number
isNumber = function(n) { return !isNaN(parseFloat(n)) && isFinite(n); };

//Strip HTML characters
strip_tags = function(html) { return $(html).text(); };

//Default selected item
$(function(){ $('.af-default-select').first().focus(); });
