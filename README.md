# weather-cli-app
Simple CLI weather app in node.js. Run the app in the command line passing an address to get the weather for it.

## To run the app just run it from the command line. Run with the help parameter for usage:
```
> node app.js --help

Options:
  -a, --address  Address for providing the weather           [string] [required]
  --help, -h     Show help                                             [boolean]
```

## Getting a weather for an address:
```
> node app.js -a "london, uk"

London, UK
It is currently 9.19C, but it feels like 5.88C.
```
