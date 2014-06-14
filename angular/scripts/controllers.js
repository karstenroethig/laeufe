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

laeufeControllers.controller( 'EventDetailController', [ '$scope', '$routeParams', '$http', '$timeout',
	function( $scope, $routeParams, $http, $timeout ) {

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

		$http.get( 'data/' + $routeParams.eventKey + '.json' ).success( function( data ) {
			$scope.event = data;

			updateCountdown();
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