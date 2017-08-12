require('dotenv').config();
const yargs = require('yargs');
const axios = require('axios');

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

const encodedAddress = encodeURIComponent(argv.address);
const queryParameter = `address=${encodedAddress}`;
const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?${queryParameter}`;

axios.get(geocodeURL)
  .then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find the specified address.');
    } else {
      let lat = response.data.results[0].geometry.location.lat;
      let lng = response.data.results[0].geometry.location.lng;
      console.log(response.data.results[0].formatted_address);

      const weatherURL = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${lat},${lng}?&units=auto`;

      axios.get(weatherURL)
        .then((response) => {
          let temperature = response.data.currently.temperature;
          let apparentTemperature = response.data.currently.apparentTemperature;
          let temperatureUnit = response.data.flags.units === 'us' ? 'F' : 'C';

          if (temperature === apparentTemperature) {
            console.log(`It is currently ${temperature}${temperatureUnit}.`);
          } else {
            console.log(`It is currently ${temperature}${temperatureUnit}, but it feels like ${apparentTemperature}${temperatureUnit}.`);
          }
        })
        .catch((error) => {
          throw new Error('Unable to get the weather for that region.');
        });
    }
  })
  .catch((error) => {
    if (error.code === 'ENOTFOUND') {
      console.log('Unable to connect to Google services.');
    } else {
      console.log(error.message);
    }

  });