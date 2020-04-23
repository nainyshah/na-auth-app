class ErrorHandler extends Error {
	constructor(statusCode = 500, message) {
		super();
		this.statusCode = statusCode;
		this.message = message;
	}
}

const createError = (error, res, next) => {
	console.log(error + '=======> Error Handler class');
	const { statusCode, message } = error;
	res.status(statusCode || 500).send({
		error: {
			statusCode: statusCode || 500,
			message: message || 'Internal Server Error.....',
		},
	});
	next();
};

module.exports = {
	ErrorHandler,
	createError,
};
