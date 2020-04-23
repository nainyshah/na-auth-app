const express = require('express');
const path = require('path');
require('dotenv').config({
	path: path.join(__dirname, '../config/dev.env'),
});
require('./db/mongoose');
const auth = require('./middleware/auth');
const userRoute = require('./routes/route');
const handleError = require('./middleware/errorhandler');
// var logger = require('morgan');

// Will implement morgan logger later.

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(auth);

app.use('/', userRoute);
app.use(handleError);
// app.use((error, req, res, next) => {
// 	res.status(error.status || 500).send({
// 		error: {
// 			status: error.status || 500,
// 			message: error.message || 'Internal Server Error',
// 		},
// 	});
// });

module.exports = app;
