// server/models/userModel.js
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ErrorHandler } = require('../helper/error');

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error('Email is invalid');
				}
			},
		},
		password: {
			type: String,
			required: true,
			minlength: [7, 'password length cannot be less than 6'],
			trim: true,
			validate(value) {
				if (value.toLowerCase().includes('password')) {
					throw new Error('Password cannot contain "password"');
				}
			},
		},
		role: {
			type: String,
			default: 'basic',
			enum: ['basic', 'supervisor', 'admin'],
		},
		accessToken: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

UserSchema.methods.toJSON = function () {
	const usr = this;
	const userObject = usr.toObject();
	delete userObject._id;
	delete userObject.password;
	delete userObject.accessToken;
	delete userObject.createdAt;
	delete userObject.updatedAt;
	delete userObject.__v;
	return userObject;
};

UserSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign(
		{ username: user.username.toString() },
		process.env.JWT_SECRET,
		{
			expiresIn: '60m',
		}
	);
	user.accessToken = token; //user.tokens.concat({ token });
	await user.save();
	return token;
};

UserSchema.statics.userAlreadyExit = async (username) => {
	try {
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			throw new ErrorHandler(409, 'Username already exist.');
		}
		return existingUser;
	} catch (error) {
		throw error;
	}
};

UserSchema.statics.emailAlreadyExit = async (email) => {
	try {
		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			throw new ErrorHandler(409, 'Email already registered!');
		}
		return existingEmail;
	} catch (error) {
		throw error;
	}
};

UserSchema.statics.findByCredentials = async (username, password) => {
	try {
		const user = await User.findOne({ username });
		if (!user) {
			throw new ErrorHandler(404, 'username does not exist');
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new ErrorHandler(404, 'Password is not correct');
		}
		return user;
	} catch (error) {
		throw error;
	}
};

// Pre methods
// before save
UserSchema.pre('save', async function (next) {
	const user = this;
	// console.log("Just before saving!");
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
