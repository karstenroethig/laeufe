'use strict';

var laeufeServices = angular.module( 'laeufeServices', [] );

laeufeServices.factory( 'EventDataService', [ '$http',
	function( $http ) {

		var srv = {};

		srv._baseUrl = '';

		// Service implementation
		srv.getEventByKey = function( key ) {
			return $http.get( srv._baseUrl + 'data/' + key + '.json' );
		};

		srv.getEvents = function() {
			return $http.get( srv._baseUrl + 'data/events.json' );
		};

		srv.getEventLocations = function() {
			return $http.get( srv._baseUrl + 'data/locations.json' );
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
			}
		};
	}
]);