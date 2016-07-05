var moment = require('moment');
var twix = require('twix');

var holidays = [
	'2016-01-01',	// New Year's
	'2016-07-01',	// Canada Day
	'2016-10-10', // Thanksgiving
	'2016-12-25',	// Christmas
	'2016-12-31'	// New Year's Eve
];

module.exports.isValid = (value) => { 
	return (value !== null && value !== '' && value !== undefined);
}

module.exports.getBusinessDaysBetween = (from, to) => {
	var days = to.diff(from, 'days');
	var iterator = from.twix(to).iterate('days');

	while (iterator.hasNext()) {
		var day = iterator.next();
		days = (holidays.indexOf(day.format('YYYY-MM-DD')) !== -1) ||
		       (day.isoWeekday() === 6 || day.isoWeekday() === 7) ?
		       days - 1 : days;
	}

	return days;
};

module.exports.isSameMonth = (month, date) => {
	if (!moment(month).isValid || !moment(date).isValid) return false;
	return moment(month).format('YYYY-MM') === moment(date).format('YYYY-MM');
};

module.exports.holidays = holidays;
