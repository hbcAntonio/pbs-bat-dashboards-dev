var fs = require('fs');

module.exports = {
	listAll: getListAll()
};

function getListAll() {
	var result = fs.readFileSync(__dirname + '/raw/user/listAll.sql', 'utf-8');
	return result.split('\n').join(' ');
}