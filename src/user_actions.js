var userQueries = require('../queries/user.js');
var mysql = require('./db.js');
var moment = require('moment');
var utils = require('./utils.js');

module.exports = {
	list: handleList
};

function handleList(month, callback) {
	mysql.query(userQueries.listAll, (err, rows, fields) => {
		if (err) {
			throw err;
		} 
		else if (!moment(month).isValid) {
			console.log('err: month date received is invalid', month);
		} 
		else {
			var results = [];
			
			rows.forEach(row => {	
				var startDate = utils.isSameMonth(month, row.createdAt) ?
				moment(row.createdAt) : moment(month);

				var endDate = utils.isSameMonth(month, row.deactivatedAt) ?
				moment(row.deactivatedAt) : moment(startDate).endOf('month');

				var daysBetween = utils.getBusinessDaysBetween(startDate, endDate);

				var result = {
					name: row.name, 
					role: row.role,
					expected: (daysBetween / 5) * row.hours,
					email: row.email
				};

				if (result.expected > 0) results.push(result);
			});

			callback(results);
		}
	});
}
