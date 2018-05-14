# Weather CLI app

* NodeJS CLI weather app using data from the Google Maps geocoding service and the DarkSky API. Run the app in the command line passing an address to get the weather for that location.

## How to run

To get started:

* install all project dependencies with `npm install`

  Notable dependencies:
```js
  "axios": "^0.16.2",
  
  "dotenv": "^4.0.0",
    
  "request": "^2.81.0",
    
  "yargs": "^8.0.2"
```

* Create a `.env` file in the root of your project and add the following:
```js
  DARK_SKY_API_KEY = <your dark sky api key>
```

* Although it is not necessary for the project to run, it is better to register for an API key for the Google service and add the key to the url call, otherwise you might get this message in the response: `You have exceeded your daily request quota for this API. We recommend registering for a key at the Google Developers Console: https://console.developers.google.com/apis/credentials`

## How to use it

* To use the app simply run it from the command line. Pass the `help` option to see the commands available:
```
> node app.js --help
```
![Screen Shot for help command](https://raw.githubusercontent.com/digaodev/weather-cli-app/docs/docs/Screen_help.png?raw=true)

```
> node app.js -a "London, UK"
```
![Screen Shot for address command](https://raw.githubusercontent.com/digaodev/weather-cli-app/docs/docs/Screen_address.png?raw=true)
