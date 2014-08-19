'use strict';

var laeufeControllers = angular.module( 'laeufeControllers', [] );

laeufeControllers.controller( 'EventListController', [ '$scope', 'EventDataService',
	function( $scope, EventDataService ) {

		$scope.query = '';
		$scope.order = '-date';

		$scope.events = [];

		EventDataService.getEvents().then( function( res ) {
			$scope.events = res.data;
		}, function( error ) {
			console.log( 'An error occurred.', error );
		});
	}
]);

laeufeControllers.controller( 'EventDetailController', [ '$scope', '$routeParams', '$timeout', 'EventDataService',
	function( $scope, $routeParams, $timeout, EventDataService ) {

		$scope.eventKey = $routeParams.eventKey;

		$scope.countdown = null;

		var updateCountdown = function() {

			if( !$scope.event ) {
				return;
			}

			$timeout( function() {
				var now = new Date();
				var eventDate = new Date( $scope.event.date );

				if( eventDate.getTime() < now.getTime() ) {
					$scope.countdown = null;
					return;
				}

				$scope.countdown = eventDate.getTime() - now.getTime();

				updateCountdown();
			}, 1000 );
		};

		EventDataService.getEventByKey( $routeParams.eventKey ).then( function( res ) {
			$scope.event = res.data;

			updateCountdown();
		}, function( error ) {
			console.log( 'An error occurred.', error );
		});
	}
]);

laeufeControllers.controller( 'MapController', [ '$scope', 'EventDataService',
	function( $scope, EventDataService ) {

		$scope.locations = [];

		EventDataService.getEventLocations().then( function( res ) {
			$scope.locations = res.data;
		}, function( error ) {
			console.log( 'An error occurred.', error );
		});
	}
]);