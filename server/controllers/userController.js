const User = require('../models/user');
const { ErrorHandler } = require('../helper/error');
const { roles } = require('../roles');

exports.grantAccess = function (action, resource) {
	return async (req, res, next) => {
		try {
			console.log(req.user.role);
			const permission = roles.can(req.user.role)[action](resource);
			if (!permission.granted) {
				throw new ErrorHandler(
					404,
					"You don't have enough permission to perform this action"
				);
			}
			next();
		} catch (error) {
			next(error);
		}
	};
};

exports.allowIfLoggedin = async (req, res, next) => {
	try {
		const user = res.locals.loggedInUser;
		if (!user) {
			throw new ErrorHandler(
				404,
				'You need to be logged in to access this route'
			);
		}
		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};

exports.test = async (req, res, next) => {
	try {
		res.status(200).send({ message: 'Service is live' });
	} catch (error) {
		next(error);
	}
};

exports.signup = async (req, res, next) => {
	try {
		const user = new User(req.body);
		const existingUser = await User.userAlreadyExit(user.username);
		const existingEmail = await User.emailAlreadyExit(user.email);

		if (!(existingUser || existingEmail)) {
			await user.save();
			const token = await user.generateAuthToken();
			res.status(201).send({ user, token });
		}
	} catch (error) {
		next(error);
	}
};

exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await User.findByCredentials(username, password);
		const token = await user.generateAuthToken();
		res.status(200).json({
			user,
			token,
		});
	} catch (error) {
		next(error);
	}
};
