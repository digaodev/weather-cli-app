const yargs = require('yargs');
require('dotenv').config();

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address for providing the weather',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var coordinates = geocode.geocodeAddress(argv.address, (errorMessage, addressResults) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    weather.getWeather(addressResults.latitude, addressResults.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        if (weatherResults.temperature === weatherResults.apparentTemperature) {
          console.log(`It is currently ${weatherResults.temperature}.`);
        } else {
          console.log(`It is currently ${weatherResults.temperature}, but it feels like  ${weatherResults.apparentTemperature}.`);
        }
      }
    });
  }
});
