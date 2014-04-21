/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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
/**
 * bkCellPluginManager
 * bkCellPluginManager load and manages loaded cell menu plugins.
 */
(function() {
  'use strict';
  var M_bkCellPluginManager = angular.module('M_bkCellPluginManager', [
    'M_bkUtils',
    'M_generalUtils',
    'M_bkHelper'  // This is only for ensuring that window.bkHelper is set, don't use bkHelper directly
  ]);
  M_bkCellPluginManager.factory('bkCellPluginManager', function(bkUtils, generalUtils) {
    // loaded plugins
    var _cellMenuPlugins = {};
    return {
      reset: function() {
        var self = this;
        $.get('/beaker/rest/util/getCellMenuPlugins')
            .done(function(menuUrls) {
              menuUrls.forEach(self.loadPlugin);
            });
      },
      loadPlugin: function(url) {
        return bkUtils.loadModule(url).then(function(ex) {
          _cellMenuPlugins[ex.cellType] = ex.plugin; // XXX should append not replace?
          return ex.plugin;
        });
      },
      getPlugin: function(cellType) {
        return _cellMenuPlugins[cellType];
      },
      getMenu: function(cellType, model) {
        return _cellMenuPlugins[cellType](model);
      }
    };
  });
})();
