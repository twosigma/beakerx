Beaker Testing
==========
Enclosed are a set of integration tests powered off of https://github.com/mojotech/dill.js. Dill.js provides a useful abstraction layer between the browser and your test implementation through combining selenium + cucumber + chai-as-promised.

### Installing

* Install node via http://nodejs.org/
* Download chromedriver via https://code.google.com/p/selenium/wiki/ChromeDriver, put it in your PATH
* Run `$ npm install`

### Running the tests

* Start the beaker server.
* In a new window run `$ npm start`

> you can override beakers root location by setting an `env` var of BASE_PATH

### Implementing new tests
* Create a new feature file in features/ folder
* Run the tests and follow the instructions to implement the new step definitions.
