var PR = require('../node_modules/protractor-perf/lib/index.js');
var perfRunner = new PR(protractor, browser);
var BPO = new require('./beaker.po.js');
var path = require('path');

describe('performance notebook', function() {
  beforeEach(function(done) {
    beakerPO = new BPO();
    browser.get(beakerPO.baseURL);
    browser.waitForAngular().then(function() {
      done();
    });
  });
  it('loads and initializes the performance notebook', function() {
    var startTime;
    perfRunner.start();
    beakerPO.openFile(path.join(__dirname, '../', 'notebooks/performance_notebook.bkr')).then(function() {return startTime = Date.now();});
    perfRunner.stop();
    perfRunner.getStats().then(function(stats) {
      console.log(stats);
      console.log("It took " + (Date.now() - startTime) + " ms to load and render performance_notebook.bkr");
    });
  });
});
