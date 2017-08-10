const request = require('request');

module.exports.geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  const queryParameter = `address=${encodedAddress}`;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?${queryParameter}`;

  request({
    url: url,
    json: true
  }, (error, response, body) => {
    if (error || response.statusCode === 404) {
      callback('Unable to connect to Google service.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find the specified address.');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });

};
