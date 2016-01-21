var BeakerPageObject = require('./beaker.po.js');
var path = require('path');

describe('autotranslation', function() {
  beforeEach(function() {
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
