'use strict';


var afWeek = function(date) {
	if (typeof date == 'undefined') return undefined;
	if (typeof date != 'object') date = new Date(date);
	switch (date.getDay()) {
		case 0: return 'Sunday';
		case 1: return 'Monday';
		case 2: return 'Tueday';
		case 3: return 'Wednesday';
		case 4: return 'Thursday';
		case 5: return 'Friday';
		case 6: return 'Saturday';
	}
};


var afAmpm = function(date) {
	if (typeof date == 'undefined') return undefined;
	if (typeof date != 'object') date = new Date(date);
	var minutes = (date.getMinutes() > 9) ? (date.getMinutes()) : ('0'+date.getMinutes());
	if (date.getHours() == 0) return '12:' + minutes + ' AM';
	if (date.getHours() > 12) return (date.getHours()-12) + ':' + minutes + ' PM';
	return date.getHours() + ':' + minutes + ' AM';
};
