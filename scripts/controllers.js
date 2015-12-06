'use strict';

var laeufeControllers = angular.module( 'laeufeControllers', [] );

laeufeControllers.controller( 'EventListController', [ '$scope', 'EventDataService',
	function( $scope, EventDataService ) {

		$scope.query = '';
		$scope.status = '';
		$scope.order = '-startDate';

		$scope.filterEvents = function( event ) {

			var showByQuery = false;
			var showByStatus = false;

			if( $scope.query === ''
				|| event.name.toLowerCase().indexOf( $scope.query.toLowerCase() ) != -1
				|| event.location.toLowerCase().indexOf( $scope.query.toLowerCase() ) != -1 ) {
				showByQuery = true;
			}

			if( $scope.status === ''
				|| event.status.indexOf( $scope.status ) != -1 ) {
				showByStatus = true;
			}

			return showByQuery && showByStatus;
    };

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
				var eventDate = new Date( $scope.event.startDate );

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
			setMarker( $scope.event.location );
		}, function( error ) {
			console.log( 'An error occurred.', error );
		});
	}
]);

laeufeControllers.controller( 'EventEditController', [ '$scope', '$routeParams', 'EventDataService', 'EventTemplateService',
	function( $scope, $routeParams, EventDataService, EventTemplateService ) {

		$scope.isEditMode = true;

		$scope.eventKey = $routeParams.eventKey;

		EventDataService.getRaces().then( function( res ) {
			$scope.races = res.data;
		}, function( error ) {
			console.log( 'An error occurred.', error );
		});

		EventDataService.getEventByKey( $routeParams.eventKey ).then( function( res ) {
			$scope.event = res.data;
		}, function( error ) {
			console.log( 'An error occurred.', error );
		});

		$scope.submitAction = function() {
			$scope.jsonFiles = EventTemplateService.generateJsonFiles( $scope.event );
		};
	}
]);

laeufeControllers.controller( 'EventNewController', [ '$scope', 'EventDataService', 'EventTemplateService',
	function( $scope, EventDataService, EventTemplateService ) {

		EventDataService.getRaces().then( function( res ) {
			$scope.races = res.data;
		}, function( error ) {
			console.log( 'An error occurred.', error );
		});

		$scope.event = {};

		$scope.submitAction = function() {
			$scope.jsonFiles = EventTemplateService.generateJsonFiles( $scope.event );
		};
	}
]);

laeufeControllers.controller( 'MapController', [ '$scope', 'EventDataService',
	function( $scope, EventDataService ) {

		$scope.locations = [];

		EventDataService.getEventLocations().then( function( res ) {
			$scope.locations = res.data;

			setMarkersWithoutMarkercluster( $scope.locations );
			// setMarkers( $scope.locations );
		}, function( error ) {
			console.log( 'An error occurred.', error );
		});
	}
]);
