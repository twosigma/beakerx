var q = require('q');
var FirefoxProfile = require('firefox-profile');
var path = require('path');

exports.getFirefoxProfile = function() {
    var deferred = q.defer();

    var firefoxProfile = new FirefoxProfile();
    firefoxProfile.setPreference("browser.download.folderList", 2);
    firefoxProfile.setPreference("browser.download.manager.showWhenStarting", false);
    firefoxProfile.setPreference("browser.download.dir", path.join(__dirname, "tmp"));
    firefoxProfile.setPreference("browser.helperApps.neverAsk.saveToDisk", "image/svg+xml, image/png");
    firefoxProfile.setPreference("browser.download.manager.showAlertOnComplete", false);
    firefoxProfile.encoded(function(encodedProfile) {
        var multiCapabilities = [{
            shardTestFiles: true,
            maxInstances: 3,
            browserName: 'firefox',
            firefox_profile : encodedProfile
        }];
        deferred.resolve(multiCapabilities);
    });

    return deferred.promise;
};