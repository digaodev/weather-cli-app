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

geocode.geocodeAddress(argv.address)
  .then((addressResults) => {
    weather.getWeather(addressResults.latitude, addressResults.longitude)
      .then((weatherResults) => {
        const temperatureUnit = weatherResults.temperatureUnit === 'us' ? 'F' : 'C';

        if (weatherResults.temperature === weatherResults.apparentTemperature) {
          console.log(`It is currently ${weatherResults.temperature}${temperatureUnit}.`);
        } else {
          console.log(`It is currently ${weatherResults.temperature}${temperatureUnit}, but it feels like ${weatherResults.apparentTemperature}${temperatureUnit}.`);
        }
      })
      .catch((errorMessage) => {
        console.log(errorMessage);
      });
  })
  .catch((errorMessage) => {
    console.log(errorMessage);
  });