'use strict';

var laeufeFilters = angular.module( 'laeufeFilters', [] );

laeufeFilters.filter( 'checkmark', function() {
	return function( input ) {
		return input ? 'ok' : 'minus';
	};
});

laeufeFilters.filter( 'countdown', function() {
	return function( input ) {

		if( typeof input !== 'number' ) {
			return input;
		}

		var oneSecond = 1000;
		var oneMinute = oneSecond * 60;
		var oneHour = oneMinute * 60;
		var oneDay = oneHour * 24;

		var days = input / oneDay;
		var daysInt = parseInt( days.toString() );

		input = input - daysInt * oneDay;

		var hours = input / oneHour;
		var hoursInt = parseInt( hours.toString() );

		input = input - hoursInt * oneHour;

		var minutes = input / oneMinute;
		var minutesInt = parseInt( minutes.toString() );

		input = input - minutesInt * oneMinute;

		var seconds = input / oneSecond;
		var secondsInt = parseInt( seconds.toString() );

		return daysInt + ' Tage ' + hoursInt + ' Stunden ' + minutesInt + ' Minuten ' + secondsInt + ' Sekunden';
	};
});