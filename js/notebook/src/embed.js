// Entry point for the unpkg bundle containing custom model definitions.
//
// It differs from the notebook bundle in that it does not need to define a
// dynamic baseURL for the static assets and may load some css that would
// already be loaded by the notebook otherwise.

// Export widget models and views, and the npm package version number.
module.exports = {};

require('./shared/style/bootstrap.scss');
require('./shared/style/beakerx.scss');
require('./plot/bko-combinedplot.css');
require('./plot/bko-plot.css');

var loadedModules = [
  require("./Plot"),
  require("./TableDisplay"),
  require("./EasyForm"),
  require("./TabView"),
  require("./GridView"),
  require("./CyclingDisplayBox"),
  require("./SparkUI").default,
  require("./SparkStateProgress").default,
  require("./HTMLPre").default
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
