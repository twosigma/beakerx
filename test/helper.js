/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var q = require('q');
var FirefoxProfile = require('firefox-profile');
var path = require('path');

exports.getFirefoxProfile = function(maxInstances) {
    var deferred = q.defer();

    var firefoxProfile = new FirefoxProfile();
    firefoxProfile.setPreference("browser.download.folderList", 2);
    firefoxProfile.setPreference("browser.download.manager.showWhenStarting", false);
    firefoxProfile.setPreference("browser.download.dir", path.join(__dirname, "tmp"));
    firefoxProfile.setPreference("browser.helperApps.neverAsk.saveToDisk", "image/svg+xml, image/png, text/csv, attachment/csv");
    firefoxProfile.setPreference("browser.download.manager.showAlertOnComplete", false);
    firefoxProfile.encoded(function(encodedProfile) {
        var multiCapabilities = [{
            shardTestFiles: true,
            maxInstances: maxInstances,
            browserName: 'firefox',
            firefox_profile : encodedProfile
        }];
        deferred.resolve(multiCapabilities);
    });

    return deferred.promise;
};