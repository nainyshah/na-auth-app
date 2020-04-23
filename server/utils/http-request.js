const request = require('request');
// utillity function
const httpRequest = (type, owner, options, callback) => {
  request(options, (error, response, body) => {
    if (error) {
      callback(
        'Unable to connect to National Address api.===>[frondEnd]',
        undefined
      );
    } else {
      if (response && response.statusCode === 200) {
        switch (type) {
          case 'districts':
            console.log(body);
            if (body.length === 0) {
              callback('No record found!', undefined);
            } else {
              callback(undefined, body);
            }
            break;
          case 'cities':
            if (body.length === 0) {
              callback('No record found!', undefined);
            } else {
              callback(undefined, body);
            }
            break;
          case 'regions':
            console.log(body);
            if (body.length === 0) {
              callback('No record found!', undefined);
            } else {
              callback(undefined, body);
            }
            break;
          case 'address-geocode':
            if (body.length === 0) {
              callback('No record found!', undefined);
            } else {
              callback(undefined, body);
            }
            break;
          default:
            break;
        }
      } else {
        console.log(body);
        callback(body.message, undefined);
      }
    }
  });
};

module.exports = httpRequest;
