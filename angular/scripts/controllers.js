'use strict';

var laeufeControllers = angular.module( 'laeufeControllers', [] );

laeufeControllers.controller( 'EventListController', [ '$scope', '$http',
	function( $scope, $http ) {

		$scope.query = '';
		$scope.order = '-date';

		$scope.events = [];

		$http.get( 'data/events.json' ).success( function( data ) {
			$scope.events = data;
		});
	}
]);

laeufeControllers.controller( 'EventDetailController', [ '$scope', '$routeParams', '$http',
	function( $scope, $routeParams, $http ) {

		$http.get( 'data/' + $routeParams.eventKey + '.json' ).success( function( data ) {
			$scope.event = data;
		});
	}
]);

laeufeControllers.controller( 'MapController', [ '$scope', '$http',
	function( $scope, $http ) {

		$scope.locations = [];

		$http.get( 'data/locations.json' ).success( function( data ) {
			$scope.locations = data;
		});
	}
]);