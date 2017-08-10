const request = require('request');

module.exports.getWeather = (lat, lng, callback) => {
  const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${lat},${lng}`;

  request({
    url: url,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to get the weather for that region.');
    }
  });

};
