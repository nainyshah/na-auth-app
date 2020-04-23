const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const nationalAddressController = require('../controllers/nationalAddressFEController');
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get(
	'/test',
	userController.allowIfLoggedin,
	userController.grantAccess('readAny', 'test'),
	userController.test
);
router.get(
	'/regions',
	userController.allowIfLoggedin,
	userController.grantAccess('readAny', 'regions'),
	nationalAddressController.getRegion
);

router.get(
	'/cities',
	userController.allowIfLoggedin,
	userController.grantAccess('readAny', 'cities'),
	nationalAddressController.getCities
);

router.get(
	'/districts',
	userController.allowIfLoggedin,
	userController.grantAccess('readAny', 'districts'),
	nationalAddressController.getDistricts
);

router.get(
	'/address',
	userController.allowIfLoggedin,
	userController.grantAccess('readAny', 'address'),
	nationalAddressController.getAddress
);

module.exports = router;
