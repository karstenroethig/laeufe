'use strict';

var laeufeServices = angular.module( 'laeufeServices', [] );

laeufeServices.factory( 'EventDataService', [ '$http',
	function( $http ) {

		var srv = {};

		srv._baseUrl = 'data/';
		srv._urlEnding = '.json';

		// srv._baseUrl = 'http://localhost:8080/laufe/rest/';
		// srv._urlEnding = '';

		// Service implementation
		srv.getEventByKey = function( key ) {
			return $http.get( srv._baseUrl + key + srv._urlEnding );
		};

		srv.getEvents = function() {
			return $http.get( srv._baseUrl + 'events' + srv._urlEnding );
		};

		srv.getEventLocations = function() {
			return $http.get( srv._baseUrl + 'locations' + srv._urlEnding );
		};

		srv.getRaces = function() {
			return $http.get( srv._baseUrl + 'races' + srv._urlEnding );
		};

		// Public API
		return {
			getEventByKey: function( key ) {
				return srv.getEventByKey( key );
			},
			getEvents: function() {
				return srv.getEvents();
			},
			getEventLocations: function() {
				return srv.getEventLocations();
			},
			getRaces: function() {
				return srv.getRaces();
			}
		};
	}
]);

laeufeServices.factory( 'EventTemplateService', [
	function() {

		var srv = {};

		// Service implementation
		srv.generateJsonFiles = function( event ) {

			var key = '[year]-' + event.raceKey + '-[location]';

			// [key].json
			var eventContentLines = [];

			eventContentLines.push( '{' );
			eventContentLines.push( '\t"key": "' + key + '",' );
			eventContentLines.push( '\t"raceKey": "' + event.raceKey + '",' );
			eventContentLines.push( '\t"name": "' + event.name + '",' );
			eventContentLines.push( '\t"startDate": "' + event.startDate + '",' );
			eventContentLines.push( '\t"endDate": ' + ( event.endDate ? ( '"' + event.endDate + '",' ) : null ) + ',' );
			eventContentLines.push( '\t"location": {' );
			eventContentLines.push( '\t\t"name": "' + event.location.name + '",' );
			eventContentLines.push( '\t\t"latitude": ' + ( event.location.latitude ? event.location.latitude : null ) + ',' );
			eventContentLines.push( '\t\t"longitude": ' + ( event.location.longitude ? event.location.longitude : null ) );
			eventContentLines.push( '\t},' );
			eventContentLines.push( '\t"finished": ' + ( event.finished ? event.finished : false ) + ',' );
			eventContentLines.push( '\t"runs": [' );
			eventContentLines.push( '\t\t{' );
			eventContentLines.push( '\t\t\t"startNumber": 0,' );
			eventContentLines.push( '\t\t\t"startTime": "yyyy-MM-ddTHH:mm",' );
			eventContentLines.push( '\t\t\t"distance": "? km",' );
			eventContentLines.push( '\t\t\t"time": "00:00:00",' );
			eventContentLines.push( '\t\t\t"team": null,' );
			eventContentLines.push( '\t\t\t"note": null' );
			eventContentLines.push( '\t\t}' );
			eventContentLines.push( '\t],' );
			eventContentLines.push( '\t"costs": {' );
			eventContentLines.push( '\t\t"total": "",' );
			eventContentLines.push( '\t\t"positions": [' );
			eventContentLines.push( '\t\t\t{' );
			eventContentLines.push( '\t\t\t\t"description": "",' );
			eventContentLines.push( '\t\t\t\t"subTotal": ""' );
			eventContentLines.push( '\t\t\t}' );
			eventContentLines.push( '\t\t]' );
			eventContentLines.push( '\t}' );
			eventContentLines.push( '}' );

			// events.json
			var eventsContentLines = [];

			eventsContentLines.push( '[' );
			eventsContentLines.push( '\t...' );
			eventsContentLines.push( '\t,' );
			eventsContentLines.push( '\t{' );
			eventsContentLines.push( '\t\t"key": "' + key + '",' );
			eventsContentLines.push( '\t\t"raceKey": "' + event.raceKey + '",' );
			eventsContentLines.push( '\t\t"name": "' + event.name + '",' );
			eventsContentLines.push( '\t\t"startDate": "' + event.startDate + '",' );
			eventsContentLines.push( '\t\t"endDate": ' + ( event.endDate ? ( '"' + event.endDate + '",' ) : null ) );
			eventsContentLines.push( '\t\t"location": "' + event.location.name + '",' );
			eventsContentLines.push( '\t\t"distance": "? km",' );
			eventsContentLines.push( '\t\t"time": null,' );
			eventsContentLines.push( '\t\t"costs": "0,00 €",' );
			eventsContentLines.push( '\t\t"finished": ' + ( event.finished ? event.finished : false ) );
			eventsContentLines.push( '\t}' );
			eventsContentLines.push( ']' );

			// locations.json
			var locationsContentLines = [];

			locationsContentLines.push( '[' );
			locationsContentLines.push( '\t...' );
			locationsContentLines.push( '\t,' );
			locationsContentLines.push( '\t{' );
			locationsContentLines.push( '\t\t"name": "' + event.location.name + '",' );
			locationsContentLines.push( '\t\t"latitude": ' + ( event.location.latitude ? event.location.latitude : null ) + ',' );
			locationsContentLines.push( '\t\t"longitude": ' + ( event.location.latitude ? event.location.latitude : null ) + ',' );

			locationsContentLines.push( '\t\t"events": [' );
			locationsContentLines.push( '\t\t\t{' );
			locationsContentLines.push( '\t\t\t\t"key": "' + key + '",' );
			locationsContentLines.push( '\t\t\t\t"name": "' + event.name + '"' );
			locationsContentLines.push( '\t\t\t}' );
			locationsContentLines.push( '\t\t]' );
			locationsContentLines.push( '\t}' );
			locationsContentLines.push( ']' );

			return [
				{
					filename: key + '.json',
					content: eventContentLines.join( '\n' )
				},
				{
					filename: 'events.json',
					content: eventsContentLines.join( '\n' )
				},
				{
					filename: 'locations.json',
					content: locationsContentLines.join( '\n' )
				}
			];
		};	

		// Public API
		return {
			generateJsonFiles: function( event ) {
				return srv.generateJsonFiles( event );
			}
		};
	}
]);