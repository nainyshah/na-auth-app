const httpRequest = require('./http-request');
const baseUrlAddress = 'http://' + process.env.BASE_URL;

// function to call third party API
// LOOKUPS
const regions_fe = (callback) => {
  const query = '/regions';
  const url = baseUrlAddress + query;
  console.log(url);
  const options = {
    method: 'GET',
    url: url,
    json: true,
  };
  callback = httpRequest('regions', -1, options, callback);
};

const citiesByRegion_fe = (region, callback) => {
  console.log('get all cities by region Id');
  const query = '/cities?region=' + region;

  const url = baseUrlAddress + query;
  console.log(url);
  const options = {
    method: 'GET',
    url: url,
    json: true,
  };
  callback = httpRequest('cities', region, options, callback);
};

const districts_fe = (city, callback) => {
  console.log('get all districts by city Id');
  const query = '/districts?city=' + city;

  const url = baseUrlAddress + query;
  console.log(url);
  const options = {
    method: 'GET',
    url: url,
    json: true,
  };
  callback = httpRequest('districts', city, options, callback);
};

const addressbyGeoCode_fe = (lat, long, callback) => {
  console.log('get address by geocode.');
  const query = '/address-sa?lat=' + lat + '&long=' + long;

  const url = baseUrlAddress + query;
  console.log(url);
  const options = {
    method: 'GET',
    url: url,
    json: true,
  };
  callback = httpRequest('address-geocode', -1, options, callback);
};

module.exports = {
  regions_fe,
  citiesByRegion_fe,
  districts_fe,
  addressbyGeoCode_fe,
};
