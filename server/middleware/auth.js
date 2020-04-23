const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ErrorHandler } = require('../helper/error');

const auth = async (req, res, next) => {
	try {
		if (req.headers['x-access-token']) {
			console.log(req.headers['x-access-token']);
			const accessToken = req.headers['x-access-token'];
			console.log(accessToken);
			const { username, exp } = await jwt.verify(
				accessToken,
				process.env.JWT_SECRET
			);
			console.log(username);
			// Check if token has expired
			if (exp < Date.now().valueOf() / 1000) {
				// return res.status(401).send({
				// 	error: 'JWT token has expired, please login to obtain a new one',
				// });
				console.log('JWT expired here===>');
				throw new ErrorHandler(
					401,
					'JWT token has expired, please login to obtain a new one'
				);
				//next();
			}
			res.locals.loggedInUser = await User.findOne({ username, accessToken });
			next();
		} else {
			next();
		}
	} catch (error) {
		next(error);
	}
};

module.exports = auth;
