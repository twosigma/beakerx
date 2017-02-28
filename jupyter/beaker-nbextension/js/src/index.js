// Entry point for the notebook bundle containing custom model definitions.
//
// Setup notebook base URL
//
// Some static assets may be required by the custom widget javascript. The base
// url for the notebook is not known at build time and is therefore computed
// dynamically.
__webpack_public_path__ = document.querySelector('body').getAttribute('data-base-url') + 'nbextensions/beaker-nbextension/';

// Export widget models and views, and the npm package version number.
module.exports = {};

var loadedModules = [
  require("./Plot"),
  require("./TableDisplay")
];

for (var i in loadedModules) {
  if (loadedModules.hasOwnProperty(i)) {
    var loadedModule = loadedModules[i];
    for (var target_name in loadedModule) {
      if (loadedModule.hasOwnProperty(target_name)) {
        module.exports[target_name] = loadedModule[target_name];
      }
    }
  }
}

module.exports['version'] = require('../package.json').version;
