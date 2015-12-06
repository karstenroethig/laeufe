'use strict';

var laeufeFilters = angular.module( 'laeufeFilters', [] );

laeufeFilters.filter( 'currency', function() {
	return function( input ) {

		if( input === null ) {
			return '';
		}

		var number = input.toFixed( 2 ) + '';
		var x = number.split( '.' );
		var x1 = x[0];
		var x2 = x.length > 1 ? ',' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;

		while( rgx.test( x1 ) ) {
			x1 = x1.replace( rgx, '$1' + ',' + '$2' );
		}

		return x1 + x2;
	};
});

laeufeFilters.filter( 'status', function() {
	return function( input ) {

		switch( input ) {
			case 'registered':
				return 'time';
			case 'completed':
				return 'ok';
			case 'failed':
				return 'remove';
			default:
				// status 'planed'
				return 'minus';
		}
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

var months = [ 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember' ];

laeufeFilters.filter( 'dateRangePretty', function() {
	return function( input ) {

		if( !input || !input.startDate ) {
			return '';
		}

		var output = [];

		var startDate = new Date( input.startDate );
		var startParts = [ startDate.getFullYear(), startDate.getMonth(), startDate.getDate() ];

		var endParts = [];

		if( input.endDate ) {
			var endDate = new Date( input.endDate );
			endParts = [ endDate.getFullYear(), endDate.getMonth(), endDate.getDate() ];
		} else {
			endParts = [ startDate.getFullYear(), startDate.getMonth(), startDate.getDate() ];
		}

		var sameYear = ( startParts[0] === endParts[0] );
		var sameMonth = sameYear && ( startParts[1] === endParts[1] );
		var sameDay = sameMonth && ( startParts[2] === endParts[2] );

		if( !sameDay ) {
			output.push( startParts[2] );
			output.push( '.' );
		}

		if( !sameMonth ) {
			output.push( ' ' );
			output.push( months[startParts[1]] );
		}

		if( !sameYear ) {
			output.push( ' ' );
			output.push( startParts[0] );
		}

		if( !sameDay && sameMonth ) {
			output.push( '-' );
		}

		if( !sameMonth || !sameYear ) {
			output.push( ' - ' );
		}

		output.push( endParts[2] );
		output.push( '. ' );
		output.push( months[endParts[1]] );
		output.push( ' ' );
		output.push( endParts[0] );

		return output.join( '' );
	};
});
