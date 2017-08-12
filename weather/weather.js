const request = require('request');

module.exports.getWeather = (lat, lng) => {
  const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${lat},${lng}?&units=auto`;

  return new Promise ((resolve, reject) => {
    request({
      url: url,
      json: true
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve({
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature,
          temperatureUnit: body.flags.units
        });
      } else {
        reject('Unable to get the weather for that region.');
      }
    });
  });
  
};
