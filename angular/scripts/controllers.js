'use strict';

var laeufeControllers = angular.module( 'laeufeControllers', [] );

laeufeControllers.controller( 'EventListController', [ '$scope', '$http',
	function( $scope, $http ) {

		$scope.query = '';
		$scope.order = '-age';

		$scope.events = [];

		$http.get( 'data/events.json' ).success( function( data ) {
			$scope.events = data;
		});
	}
]);

laeufeControllers.controller( 'EventDetailController', [ '$scope', '$routeParams',
	function( $scope, $routeParams ) {

		$scope.eventKey = $routeParams.eventKey;
	}
]);