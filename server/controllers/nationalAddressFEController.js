const {
	regions_fe,
	citiesByRegion_fe,
	districts_fe,
	addressbyGeoCode_fe,
} = require('../utils/national-address-facade');
const { ErrorHandler } = require('../helper/error');

exports.getRegion = async (req, res, next) => {
	try {
		regions_fe(async (error, body) => {
			if (error) {
				return res.status(500).send({
					error,
				});
			} else {
				console.log('<======= FrondEnd Region Call =======>');
				// console.log(body);
				if (!body) {
					throw new ErrorHandler(404, 'No record found!');
				} else {
					res.status(200).send(body);
				}
			}
		});
	} catch (error) {
		next(error);
	}
};

exports.getCities = async (req, res, next) => {
	try {
		if (!req.query.region) {
			throw new ErrorHandler(400, 'You must provide [region]');
		}
		const region = req.query.region;
		citiesByRegion_fe(region, async (error, body) => {
			if (error) {
				throw new ErrorHandler(404, error);
			} else {
				console.log('<======= FrondEnd Region Call =======>');
				if (!body) {
					throw new ErrorHandler(404, 'No record found!');
				} else {
					res.status(200).send(body);
				}
			}
		});
	} catch (error) {
		next(error);
	}
};

exports.getDistricts = async (req, res, next) => {
	try {
		if (!req.query.city) {
			throw new ErrorHandler(400, 'You must provide [city]');
		}
		const city = req.query.city;
		districts_fe(city, async (error, body) => {
			if (error) {
				throw new ErrorHandler(500, error);
			} else {
				console.log('<======= FrondEnd Region Call =======>');
				// console.log(body);
				if (!body) {
					throw new ErrorHandler(404, 'No record found!');
				} else {
					res.status(200).send(body);
				}
			}
		});
	} catch (error) {
		next(error);
	}
};

exports.getAddress = async (req, res, next) => {
	try {
		if (!req.query.lat) {
			throw new ErrorHandler(400, 'You must provide [lat/long].');
		}
		if (!req.query.long) {
			throw new ErrorHandler(400, 'You must provide [lat/long].');
		}
		const lat = req.query.lat;
		const long = req.query.long;
		addressbyGeoCode_fe(lat, long, async (error, body) => {
			if (error) {
				throw new ErrorHandler(500, error);
			} else {
				console.log('<======= FrondEnd address-sa Call =======>');
				if (!body) {
					throw new ErrorHandler(404, 'No record found!');
				}
				res.status(200).send(body);
			}
		});
	} catch (error) {
		next(error);
	}
};
