var browserPerf = require('browser-perf');
browserPerf('http://127.0.0.1:8801/beaker/#/session/z1RVJK', function(err, res) {
    // res - array of objects. Metrics for this URL
    if (err) {
        console.log('ERROR: ' + err);
    } else {
        console.log("Time to responsive UI: " + (Date.now() - res[0].loadEventEnd) + "ms");
    }
}, {
    selenium: 'http://localhost:4444/wd/hub',
    browsers: ['chrome']
});