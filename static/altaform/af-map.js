'use strict';


//Google Maps

google.maps.visualRefresh = true;

var gmap = 0;
var gmapInfoWindow = 0;
var gmapMarkers = new Array();
var gmapOptions = {
	zoom: 4,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	center: new google.maps.LatLng(41, -100),
	styles: [
		{"stylers":[{"hue":"#00C8E6"}, {"lightness":63}, {"gamma":0.17}]},
		{"featureType":"water", "stylers":[{"color":"#00C8E6"}]}
	],
};



var gmapMarker = function(p1, p2, p3, p4, p5) {
	if (!gmap) return false;

	if (typeof(p1) === 'object') {
		var item = {
			pos: p1,
			icn: p2,
			loc: p3,
			nfo: p4,
			wnd: false
		};
	} else if (typeof(p1) === 'number'  &&  typeof(p2) === 'number') {
		var item = {
			pos: new google.maps.LatLng(p1, p2),
			icn: p3,
			loc: p4,
			nfo: p5,
			wnd: false
		};
	} else return false;

	for (i=0; i<gmapMarkers.length; ++i) {
		if (gmapMarkers[i].pos.toString() == item.pos.toString()) {
			if (item.nfo) {
				var content = item.nfo.replace(/<ul(.*?)>/,'');
				item = gmapMarkers[i];
				if (item.wnd) {
					content = item.wnd.getContent().replace('</ul>', content)
					item.wnd.setContent( content );
				}
			}
			return item;
		}
	}

	var image = new google.maps.MarkerImage(
		item.icn,
		new google.maps.Size(48, 48),
		new google.maps.Point(0, 0),
		new google.maps.Point(24, 48)
	);

	item.marker = new google.maps.Marker({
		map: gmap,
		position: item.pos,
		icon: image,
		anchorPoint: new google.maps.Point(0, -32),
		shape: {coords:[23,47, 6,15, 14,4, 23,0, 24,0, 33,4, 39,15, 24,47], type:'poly'},
	});

	if (item.nfo) {
		item.wnd = new google.maps.InfoWindow({ content: item.loc+item.nfo });
		google.maps.event.addListener(item.marker, 'click', function() {
			if (gmapInfoWindow) gmapInfoWindow.close();
			item.wnd.open(gmap, item.marker);
			gmapInfoWindow = item.wnd;
		});
	}

	gmapMarkers.push(item);
	return item;
};



var gmapGeolocate = function(query, url) {
	service = new google.maps.places.PlacesService(gmap);
	service.textSearch({'query': query}, function(results, status) {
		if (status != google.maps.places.PlacesServiceStatus.OK) return;

		var loc = results[0].geometry.location.toString();
		$.post( url, { 'name':query, 'loc':loc } );

		gmap.setCenter(results[0].geometry.location);
	});
};
