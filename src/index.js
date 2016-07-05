var express = require('express');
var basicAuth = require('basic-auth');
require('dotenv').config();

var mysql = require('./db');
var user = require('./user_actions');

var server = express();

var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'hbcantonio' && user.pass === 'pbs336PM_') {
    return next();
  } else {
    return unauthorized(res);
  };
};

server.get('/getActiveUsers', auth, (req, res) => {
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	console.log(req.method, fullUrl);// ,'\n with auth', req.headers.authorization);

	user.list(req.query.month, (results) => {
		//console.log(JSON.stringify(results, null, 2));
		res.send(JSON.stringify(results, null, 2));
	});
});

server.listen(3000, () => {
	console.log('Server listening on port 3000');
});