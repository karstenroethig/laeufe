'use strict';

angular.module( 'laeufeFilters', [] ).filter( 'checkmark', function() {
	return function( input ) {
		return input ? 'ok' : 'minus';
	};
});