'use strict';

var laeufeApp = angular.module( 'laeufeApp', [
	'ngRoute',
	'laeufeControllers'
]);

laeufeApp.config( [ '$routeProvider',
	function( $routeProvider ) {
		$routeProvider.
			when( '/events', {
				templateUrl: 'templates/event-list.html',
				controller: 'EventListController'
			}).
			when( '/events/:eventKey', {
				templateUrl: 'templates/event-detail.html',
				controller: 'EventDetailController'
			}).
			when( '/map', {
				templateUrl: 'templates/map.html',
				controller: 'MapController'
			}).
			otherwise( {
				redirectTo: '/events'
			});
	}
]);