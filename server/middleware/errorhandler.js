const { createError } = require('../helper/error');

// app.use((error, req, res, next) => {

// });

const handleError = (error, req, res, next) => {
	console.log(error + '=======> Middleware');
	createError(error, res, next);
	// console.log(error.status + '=======!!');
	// res.status(error.status || 500).send({
	// 	error: {
	// 		status: error.status || 500,
	// 		message: error.message || 'Internal Server Error',
	// 	},
	// });
	// next();
};

module.exports = handleError;
