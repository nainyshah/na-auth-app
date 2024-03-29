// server/elors.js;
const AccessControl = require('accesscontrol');
const ac = new AccessControl();

exports.roles = (function () {
	ac.grant('basic').readAny('test').readAny('regions');

	ac.grant('supervisor').extend('basic').readAny('cities');

	ac.grant('admin')
		.extend('basic')
		.extend('supervisor')
		.readAny('districts')
		.readAny('address');

	return ac;
})();
