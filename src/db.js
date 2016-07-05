var mysql = require('mysql');

var db = 
	mysql.createConnection({
		host: 'localhost',
		port: 8889,
		user: 'root',
		password: 'root',
		database: 'pbs_internal_data_production'
	});
	
module.exports = db;
