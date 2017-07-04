// Entry point for the unpkg bundle containing custom model definitions.
//
// It differs from the notebook bundle in that it does not need to define a
// dynamic baseURL for the static assets and may load some css that would
// already be loaded by the notebook otherwise.

// Export widget models and views, and the npm package version number.
module.exports = require('./Plot.js');
module.exports = require('./TableDisplay.js');
module.exports = require('./EasyForm.js');
module.exports = require('./TabView.js');
module.exports = require('./GridView.js');
module.exports['version'] = require('../package.json').version;
