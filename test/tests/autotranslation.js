var BeakerPageObject = require('./beaker.po.js');
var path = require('path');

describe('autotranslation', function() {
  beforeEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000; // Slow initialization cells, CI box might need a long time to initialize these
    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL);
    browser.waitForAngular();
  });

  it('handles JVM notebook', function(done) {
    beakerPO.openFile(path.join(__dirname, '../', 'notebooks/jvm-autotranslation-test.bkr'));
    beakerPO.waitForInstantiationCells();

    beakerPO.waitForCellOutput();

    return beakerPO.getCellOutput().getText()
    .then(function(output) {
      expect(output).toEqual('OK');
      done();
    });
  });
});
