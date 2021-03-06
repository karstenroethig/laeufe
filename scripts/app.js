'use strict';

var laeufeApp = angular.module( 'laeufeApp', [
	'ngRoute',
	'laeufeControllers',
	'laeufeFilters',
	'laeufeServices'
]);

laeufeApp.config( [ '$routeProvider',
	function( $routeProvider ) {
		$routeProvider.
			when( '/events', {
				templateUrl: 'templates/event-list.html',
				controller: 'EventListController'
			}).
			when( '/events/new', {
				templateUrl: 'templates/event-form.html',
				controller: 'EventNewController'
			}).
			when( '/events/:eventKey', {
				templateUrl: 'templates/event-detail.html',
				controller: 'EventDetailController'
			}).
			when( '/events/:eventKey/edit', {
				templateUrl: 'templates/event-form.html',
				controller: 'EventEditController'
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
