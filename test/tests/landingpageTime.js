describe('beaker landing page load', function() {
  var start, stop;

  beforeEach(function() {
    start = new Date().getTime();
  });

  afterEach(function() {
    stop = new Date().getTime();
    var len = stop-start;
    console.log("Loading time: "+len+" milliSeconds");
  });

  it('should load', function() {
    browser.get('http://localhost:8801/');
    browser.waitForAngular();
  });

});